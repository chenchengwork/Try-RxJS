import { Observable, fromEvent } from 'rxjs';
import { throttleTime, scan } from 'rxjs/operators';

const observable = Observable.create(function (observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    setTimeout(() => {
        observer.next(4);
        observer.complete();
    }, 1000);
});

const button = document.querySelector('button');
const clickObservable = fromEvent(button, 'click');

const subscription = clickObservable.pipe(throttleTime(1000))
    .pipe(scan(count => count + 1, 0))
    .subscribe(count => {
        console.log(`Clicked ${count} times`);
        subscription.unsubscribe();
    });



clickObservable.pipe(throttleTime(1000))
    .pipe(scan(count => count + 1, 0))
    .subscribe(count => console.log(`Clicked ${count} times`));

console.log("22")
