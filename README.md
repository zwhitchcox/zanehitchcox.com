# Easy way to put your resume online

Check it out [zanehitchcox.com](http://zanehitchcox.com). I can edit that at any point using Google Docs, and it's automatically published to the site within seconds. 

Now, I can put my website on my business cards, send it to employers, and now everyone will always have a fresh, professional copy of my resume.

I can also add styles and run custom scripts, because I am not loading the doc into an iframe.

## How did I did I do this?

Pretty simple, I just:

1. [Purchased my name's domain name](http://hostmonster.com)
2. [Signed up for a cloudflare account](https://cloudflare.com)
3. [Added the site to cloudflare](https://www.cloudflare.com/a/add-site)
4. Deleted the default A record and added two pointing to github's github pages servers (free)
	* 192.30.252.153
	* 192.30.252.154
5. Pointed the domain host's nameservers to cloudflare (cloudflare shows you how to do this in the next step
6. [Created my resume in Google Docs](https://drive.google.com)
7. Got the embed iFrame from my Google doc
	* File -> Publish to Web -> Embed
8. Created a gh-pages site
	* [Sign up for github](https://github.com)
	* [Create a repository name USERNAME.github.io](https://github.com/new)
	* Add a new file after your repository is created. From the repository home page, where it is telling you how to set up your repository, go to the address bar and add `/new/master` to the current address, and push enter
	* name your file index.html, and paste in the contents from [my index.html page](https://github.com/zwhitchcox/zwhitchcox.github.io/blob/master/index.html) into your own. Then replace [the url](https://github.com/zwhitchcox/zwhitchcox.github.io/blob/master/index.html#L4) with your own	and save the file
	* Now, click on new file and add a new file called CNAME and add your domain to the file, and that's it. Save, and you're done.


Now, the best laid plans of mice and men are doomed to fail, so if something goes wrong, don't panic, just [let me know](http://github.com/zwhitchcox/zwhitchcox.github.io/issues). <- if that link doesn't work, then it's ok to panic.

