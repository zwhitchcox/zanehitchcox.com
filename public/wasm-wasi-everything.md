## Intro

#### Problem to be solved/ User story

WASM seems to be the future of the web and possibly computing in general. Several method for running wasm binaries as containers already exist. E.g. [Krustlet](https://krustlet.dev/) allows you to run `wasm` binaries as containers, and the [`wasi-to-oci`](https://github.com/engineerd/wasm-to-oci) project proposes "an implementation of storing WebAssembly modules in OCI registries". [WasmEdge](https://wasmedge.org/) implements microservice functionality and [can be even be used with kubernetes](https://wasmedge.org/book/en/kubernetes.html) out of the box. You can even [run Tensorflow](https://www.secondstate.io/articles/wasi-tensorflow/) using a WasmEdge plugin.

Compiling to `wasm` means any language can interop with any other language without having to know the details of each other, so long as they expose a typed interface.

Wasm files can be run through the [`wasmtime`](https://wasmtime.dev/) binary which is a mere 13M in size or even in [WASM Micro Runtime (WAMR)](https://github.com/bytecodealliance/wasm-micro-runtime) which is only ~80K in size, and execution runs at near-native speeds.

The wasm binaries themselves are incredibly small, for instance, `node-ext2fs` which implements the ext4 file system is only ~213K compiled. This [python terminal in WASM](https://cheimes.fedorapeople.org/python-wasm/) is only 1.6M.

This means new releases could be deployed in the time it takes to download a web page. "Imagine downloading an entire operating system to run a python file?" one could imagine a future generation saying.

`wasm` is also built with security first and portability in mind. This same `.wasm` file can run on any Balena device with a `wasmtime` binary, and with [Web Assembly System Interface (WASM/WASI)](https://wasi.dev/) it can interact with the file system.

Language support is also widely available:

* [C/C++](https://emscripten.org/docs/introducing_emscripten/about_emscripten.html)
* [Rust](https://rustwasm.github.io/docs/book/)
* [Go](https://zchee.github.io/golang-wiki/WebAssembly/)

Support compiling to WASM, just to name a few. Any language that can compile to an LLVM IR can also be compiled to WASM, including ActionScript, Ada, C#, Common Lisp, PicoLisp, Crystal, CUDA, D, Delphi, Dylan, Forth, Fortran, Free Basic, Free Pascal, Graphical G, Halide, Haskell, Java bytecode, Julia, Kotlin, Lua, Objective-C, OpenCL, PostgreSQL's SQL and PLpgSQL, Ruby, Rust, Scala, Swift, XC, Xojo and Zig.

With WASI you can interact with the HostOS file system as though it were running the `.wasm` file natively, which means containers can share volumes, which is a requested feature for BalenaOS. We can intercept POSIX calls and link them to our own api, through which we can create overlay file systems.

#### Define your User/Customer/Consumer

This would be useful for pretty much straightforward apps at first, and more extensive support can be added as we go.


#### How is it currently solved?

Docker

#### The New Solution

WASM/WASI

## Proposed Implementation

Using NodeJS for the wasm runtime, you can also provide your own back end. We can expose the `ext{2,3,4}` file system to containers using [`node-ext2fs`](https://github.com/balena-io-modules/node-ext2fs) as a back end to create ext4 disk images from a file even implement our own overlay fs. When a new release is detected, we just download the new `wasm` file and use `node-ext2fs` to expose a different file to the new VM and delete the old one. Or when building an wasm container image, we can save just the changes to the previous image by using `disk-image` and only keep track of the changes to a new file.

We could also provide an API similar to `busybox` with precompiled `wasm` files. For instance, I'm currently working on compiling gnu tar in wasm. We could allow users to call `tar` and have it run on the file system currently mounted by the container, and this executable could be shared by multiple containers. We could implement our own bash interpreter that hooks the `stdout` of one `.wasm` instance to the `stdin` of another or output to the `node-ext2fs` file system, so the shared executable could operate similarly to how it would in bash.

The "`Balenafile`" interface could look similar to a `Dockerfile` interface:

```
FROM BalenaOS/python

COPY src .

EXPOSE 3000

CMD python server.py -p 3000
```
but where we would see the `python` being executed and precompile `server.py` to `.wasm` and run `server.py.wasm` whenever we see `python server.py`, while passing the arguments to its `argc`/`argv`

We could also forward all traffic to the host network on port 3000. Of course we would have our work cut out for us to get networking to work.

You can see for simple applications, this could be implemented relatively straight forwardly.

Compilation could be done in Etcher or the browser without the dependency of docker, which would work cross-platform for all major OS's.

As time goes on, better support for WASI will enable us to remove our NodeJS "glue", and eventually `wasmtime` should be able to run a container standalone. We can of course help WASI along and even shape the future WASM/WASI to our own needs.

One can even imagine a world where user space drivers could run in WASM/WASI, although this would require some hacking to `mmap` memory to kernel space/forward the interrupts, etc.

Perhaps an entire Linux VM could be emulated in this way. POSIX calls to `exec` could be mapped to `wasm` executables that run on the same `node-ext2fs` instance, and in that fashion perhaps an entire VM could be implemented.

One could imagine in the distant future, most of HostOS being only the minimal amount needed to run the WASM runtime. With as much logic the operating system as possible in `.wasm` files. Since WASM memory can be preloaded with Ahead of Time (AOT) compilation (see [wizer](https://github.com/bytecodealliance/wizer) for a working example), the HostOS would be able to cold start instaneously. BalenaOS instances could run inside a browser, on a phone, or pretty much anything with a CPU all with the same executables.

#### Migration Plan

Of course almost all applications will still require docker at first, but the supervisor could also start running `wasm` instances just as it manages docker containers and could maybe even run them in its own container. Eventually the supervisor itself could be rewritten in wasm, and we can remove the docker dependency altogether for apps that don't need it.

#### Release Plan

I think it could be "opt in" at first and automatically detected by the docker-compose (balena-compose?) file. Docker could still always be supported, and would maybe still be included in case the push a release with a Dockerfile, but wouldn't be started unless a docker container was detected.

#### Resources Need

This is probably a very long-term project, but an MVP could probably be rolled out in a few months by a few engineers.

#### Potential Issues/Risk/Blockers

WASI is pretty unstable, and we would be working with technology that is constantly changing (although that could be a good thing). The supervisor would probably need to be rewritten in Rust to be able to run it in wasm, which would have a learning curve for the team (although, we could just add basic NodeJS support in `wasm`, as we've already implemented the fs api (see `node-ext2fs`)). Support for different languages is fairly scattered, and each language will probably require a lot of attention.

## Milestones

* Run a simple `C` server in `wasm`, compiled in emscripten that can expose its port to the host network
* Stitch two containers together allowing them to communicate, essentially creating a "bridge" network
* Create a `Balenafile` interpreter to run a wasm file
  * Implement bash interpreter
  * Make `COPY` copy to ext4 fs, which is mounted in the container
* Detect `Balenafile`s automatically in the `balena-compose.yml` file
* Implement container "VM" functionality
  * Implement busybox executables that can run on the `node-ext2fs` backend (`cp`, `mkdir`, etc.)
  * Implement other POSIX system calls, i.e. `exec`, run the linked executable
* Implement "Hello World" Rust server
* Implement "Hello World" cpp server
* Implement "Hello World" NodeJS server
* Bind mount devices/sysfs/other files to images
...tbd

## Links & References

https://github.com/engineerd/wasm-to-oci
https://wasmtime.dev/
https://wasi.dev/
https://webassembly.org/
