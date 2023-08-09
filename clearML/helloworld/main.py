#!/usr/bin/env python

from clearml import Task

task = Task.init(project_name='great project', task_name='best experiment')
prev_task = Task.get_task(task_id='123456deadbeef')

params_dictionary = {'epochs': 3, 'lr': 0.4}
task.connect(params_dictionary)
