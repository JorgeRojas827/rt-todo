import { DropResult } from 'react-beautiful-dnd';
import { ITask } from '../interfaces/Task';

export const ExchangeIds = ({ destination, source }: DropResult, tasks: ITask[]) => {

    if (!destination) {
        return;
    }
  
    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
        return;
    }
    
    var items = tasks.slice();
    var reorderedItem = items.find((el) => el.id_task === source.index);
    var destinationItem = items.find((el) => el.id_task === destination.index);
    const restTasks = items.filter((item) => {
      return !(
        item.id_task === reorderedItem?.id_task ||
      item.id_task === destinationItem?.id_task
      );
    });
    var temp = reorderedItem?.id_task;
  
    reorderedItem = {
      ...reorderedItem,
      id_task: destinationItem!.id_task,
    };
    destinationItem = {
      ...destinationItem,
      id_task: temp,
    };
  
    items = [...restTasks, reorderedItem, destinationItem];

    return items;
}