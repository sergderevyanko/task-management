package org.atomspace.taskmanager.services;

import org.atomspace.taskmanager.domain.Backlog;
import org.atomspace.taskmanager.domain.Project;
import org.atomspace.taskmanager.domain.User;
import org.atomspace.taskmanager.exceptions.ProjectIdException;
import org.atomspace.taskmanager.repositories.BacklogRepository;
import org.atomspace.taskmanager.repositories.ProjectRepository;
import org.atomspace.taskmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by sergey.derevyanko on 30.07.19.
 */
@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;
    @Autowired
    private UserRepository userRepository;

    public Project saveOrUpdateProject(Project project, String username){

        try{
            User user = userRepository.findByUsername(username);
            project.setUser(user);
            project.setProjectLeader(username);
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            if(project.getId() == null){
                Backlog backlog = new Backlog();
                backlog.setProject(project);
                project.setBacklog(backlog);
                backlog.setProjectIdentifier(project.getProjectIdentifier());
            }
            else {
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier()));
            }
            return projectRepository.save(project);
        }catch (Exception e){
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier() + "'");
        }
    }

    public Project findProjectByIdentifier(String projectId){
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null){
            throw new ProjectIdException("Project ID '" + projectId + "' does not exist");
        }
        return project;
    }

    public Iterable<Project> findAllProjects(){
        return projectRepository.findAll();
    }

    public void deleteProjectByIdentifier(String projectId){
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if(project == null){
            throw new ProjectIdException("Cannot delete Project with ID '" + projectId + "'. " +
                    "Project does not exist");
        }

        projectRepository.delete(project);
    }

}
