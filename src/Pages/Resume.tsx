import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import YAML from 'yaml'

const renderContactInfo = (data: any) => {
  return (
    <>
      <h1 className="name">{data.name}</h1>
      <h2 className="title">{data.title}</h2>
      <div className="contact-info">
        <div className="contact-line">
          <ul>
            <li>{data.addr}</li>
            <li className="hide-screen">{data.phone}</li>
            <li className="hide-screen"><a href={`mailto:${data.email}`}>{data.email}</a></li>
            <li className="hide-screen"><a href={`https://${data.site}`}>{data.website}</a></li>
          </ul>
        </div>
      </div>
    </>
  )
}

const renderSkills = (data: any) => (
  <section>
  <h3>Skills</h3>
  <ul className="skills">
    {data.skills.map((skill: any) => (
      <li key={skill}>{skill}</li>
    ))}
  </ul>
  </section>
)


const EmployeeExperience = ({company, title, duration, description}: any) => (
  <div className="experience employee-experience">
    <h4><span className="company">{company}</span></h4>
    <div className="general">
    <div className="title">{title}</div>
    <div className="duration">({duration})</div>
    </div>
    <div className="description">
      <ReactMarkdown children={description} />
    </div>
  </div>
)

const renderExperience = (data: any) => (
  <section>
    <h3>Work Experience</h3>
    {data.experience.map((experience: any, i: number) => {
      if (experience.type === "employee") {
        return <span key={i}>
          <EmployeeExperience {...experience}  />
        </span>
      }
      return <span key={i}/>
    })}
  </section>
)

const renderEducation = ({education}: any) => (
  <section>
    <h3>Education</h3>
    {education.map(({school, location, graduation, degree, major, minor, description}: any) => (
      <div key={school} className="education">
          <div className="school">{school}, {location}</div>
        <div className="general">
          <div className="degree">{degree}, {major}</div>
          <div className="graduation">({graduation})</div>
        </div>
        <div className="description"><ReactMarkdown children={description} /></div>
      </div>
    ))}
  </section>
)

const renderSummary = ({summary}: any) => {
  return (
    <section className="summary">
      {summary}
    </section>
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
        {renderSummary(resumeData)}
        {renderSkills(resumeData)}
        {renderExperience(resumeData)}
        {renderEducation(resumeData)}
      </div>
    </div>
  )
}
export default Resume
