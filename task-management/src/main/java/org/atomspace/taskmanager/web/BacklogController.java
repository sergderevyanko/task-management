package org.atomspace.taskmanager.web;

import org.atomspace.taskmanager.domain.ProjectTask;
import org.atomspace.taskmanager.services.MapValidationErrorService;
import org.atomspace.taskmanager.services.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/backlog")
@CrossOrigin
public class BacklogController {

    @Autowired
    ProjectTaskService projectTaskService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{backlog_id}")
    public ResponseEntity<?> addProjectTaskToBacklog(@Valid @RequestBody ProjectTask projectTask,
                                                     BindingResult result, @PathVariable String backlog_id){

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidation(result);
        if(errorMap != null) return errorMap;

        ProjectTask storedTask = projectTaskService.addProjectTask(backlog_id, projectTask);
        return new ResponseEntity<ProjectTask>(storedTask, HttpStatus.CREATED);
    }
}
