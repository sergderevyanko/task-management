package org.atomspace.taskmanager.services;

import org.atomspace.taskmanager.domain.Project;
import org.atomspace.taskmanager.exceptions.ProjectIdException;
import org.atomspace.taskmanager.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by sergey.derevyanko on 30.07.19.
 */
@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project project){

        try{
            project.setProjectIdendifier(project.getProjectIdendifier().toUpperCase());
            return projectRepository.save(project);
        }catch (Exception e){
            throw new ProjectIdException("Project ID '" + project.getProjectIdendifier() + "'");
        }
    }

}
