import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getAlltasks() {
        return this.tasks;
    }
}
