import * as React from 'react'
import YAML from 'yamljs'
import "./Resume.scss"

const renderContactInfo = data => {
  return (
    <>
      <h1 className="name">{data.name}</h1>
      <h2 className="title">{data.title}</h2>
      <div className="contact-info">
        <div className="contact-line">
          <ul>
            <li>{data.addr}</li>
            <li>{data.phone}</li>
            <li><a href={`mailto:${data.email}`}>{data.email}</a></li>
            <li><a href={`https://${data.email}`}>{data.website}</a></li>
          </ul>
        </div>
      </div>
    </>
  )
}

const renderSkills = data => {
  return (
    <>
    <h3>Skills</h3>
    </>
  )
}

const Resume = () => {
  const [resumeData, setResumeData] = React.useState<any>({})
  const [isLoading, setIsLoading] = React.useState(true)
  const [errMsg, setErrMsg] = React.useState("")


  const getResumeData = async () => {
    const resp = await fetch("/resume.yml")
    const text = await resp.text()
    if (resp.status > 399) {
      return setErrMsg(text)
    }
    setResumeData(YAML.parse(text))
    setIsLoading(false)
  }
  React.useEffect(() => {
    getResumeData()
  }, [])

  if (errMsg) {
    return <div>
      There was an error: {errMsg}
    </div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className="resume">
      {renderContactInfo(resumeData)}
      <div className="content">
        {renderSkills(resumeData)}
      </div>
    </div>
  )
}
export default Resume