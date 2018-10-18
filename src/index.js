import { Observable, fromEvent } from 'rxjs';
import { throttleTime, scan } from 'rxjs/operators';

const observable = Observable.create(function (observer) {
    console.log('1111111111')
    observer.next(1, "a");
    observer.next(2, "b");
    observer.next(3, "c");
    setTimeout(() => {
        observer.next(4);
        observer.complete();
    }, 1000);
});
console.log(observable)
// const observer =
// observable.subscribe({
//     next: x => console.log('got value ' + x),
//     error: err => console.error('something wrong occurred: ' + err),
//     complete: () => console.log('done'),
// });


const button = document.querySelector('button');
const clickObservable = fromEvent(button, 'click');

const subscription = clickObservable.pipe()
    .pipe(
        throttleTime(1000),
        scan((count) => {
            return count + 1
        }, 0)
    )
    .subscribe((count) => {
        console.log(`Clicked ${count} times`);
        // subscription.unsubscribe();
    });



clickObservable.pipe(throttleTime(1000))
    .pipe(scan(count => count + 1, 0))
    .subscribe(count => console.log(`Clicked ${count} times`));

console.log("22")
