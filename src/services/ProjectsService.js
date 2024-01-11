import { AppState } from "../AppState.js"
import { Project } from "../models/Project.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProjectsService {
  async getProjects() {
    const response = await api.get('api/projects')
    logger.log('GOT PROJECTS', response.data)
    const newProjects = response.data.map(pojo => new Project(pojo))
    AppState.projects = newProjects
  }

  async getProjectsByProfileId(profileId) {
    const response = await api.get(`api/projects?creatorId=${profileId}`)
    logger.log('GOT PROJECTS BY CREATOR ID', response.data)
    const newProjects = response.data.map(pojo => new Project(pojo))
    AppState.profileProjects = newProjects
  }

  clearAppState() {
    AppState.activeProfile = null
    AppState.profileProjects = []
  }

}

export const projectsService = new ProjectsService()