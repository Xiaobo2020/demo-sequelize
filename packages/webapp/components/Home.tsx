import { useState } from "react"

const Home = () => {
  const [organization, setOrganization] = useState("")
  const [project, setProject] = useState("")

  const findAllProjects = () => {
    fetch("/api/project", {
      method: "GET",
    }).then(res => res.json()).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.error(err)
    })
  }

  const findAllOrganizations = () => {
    fetch("/api/organization", {
      method: "GET",
    }).then(res => res.json()).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.error(err)
    })
  }

  const createOrganization = () => {
    fetch("/api/createOrganization", {
      method: "POST",
      body: JSON.stringify({
        name: organization,
      })
    }).then(res => res.json()).then(res => {
      console.log(res.data)
      setOrganization("")
    }).catch(err => {
      console.error(err)
    })
  }

  const createProject = () => {
    // console.log("createProject", { project, organization })
    fetch("/api/createProject", {
      method: "POST",
      body: JSON.stringify({
        name: project,
        organizationName: organization,
      })
    }).then(res => res.json()).then(res => {
      console.log(res.data)
      setProject("")
    }).catch(err => {
      console.error(err)
    })
  }

  return (
    <div>
      <h1>Hello World</h1>
      <ul>
        <li>
          <input
            type="button"
            value="findAllOrganizations"
            onClick={findAllOrganizations}
          />
        </li>
        <li>
          <input
            type="button"
            value="findAllProjects"
            onClick={findAllProjects}
          />
        </li>
        <li>
          <label htmlFor="organization">Organization:</label>
          <input
            className="border-black border-2"
            type="text"
            id="organization"
            onChange={e => setOrganization(e.target.value)}
            value={organization}
          />
          <input
            disabled={!organization}
            type="button"
            value="Save"
            onClick={createOrganization}
          />
        </li>
        <li>
          <label htmlFor="project">Project:</label>
          <input
            className="border-black border-2"
            type="text"
            id="project"
            onChange={e => setProject(e.target.value)}
            value={project}
          />
          <input
            disabled={!project}
            type="button"
            value="Save"
            onClick={createProject}
          />
        </li>
      </ul>
    </div>
  )
}

export default Home;
