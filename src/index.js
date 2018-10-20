import { Observable, fromEvent, Subject } from 'rxjs';
import { throttleTime, scan, multicast, refCount } from 'rxjs/operators';

const observable = Observable.create(function (observer) {
    console.log('1111111111')
    // observer.next(1, "a");
    // observer.next(2, "b");
    // observer.next(3, "c");
    // setTimeout(() => {
    //     observer.next(4);
    //     observer.complete();
    // }, 1000);

    document.querySelector('button').addEventListener('click', () => {
        observer.next(1);
        // observer.error(new Error("observable error"))
        // observer.complete()
    })
});

// 订阅单广播
const subscribeSingleBroadcast = () => {
    const subscription1 = observable.subscribe({
        next: x => console.log('observer1->' + x),
        error: err => console.error('something wrong occurred: ' + err),
        complete: () => console.log('done'),
    });

// subscription1.unsubscribe()

    observable.subscribe({
        next: x => console.log('observer2->' + x),
        error: err => console.error('something wrong occurred: ' + err),
        complete: () => console.log('done'),
    });
};

// subscribeSingleBroadcast();

//
const subscribeMutliBroadcast = () => {
    const subject = new Subject();
    const refCounted = observable.pipe(multicast(subject), refCount());

    const subscription1 = refCounted.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });

    const subscription2 = refCounted.subscribe({
        next: (v) => console.log('observerB: ' + v)
    });

    setTimeout(() => {
        console.log('observerA unsubscribed');
        subscription1.unsubscribe();
    }, 1200);

    // 这里共享的 Observable 执行会停止，
    // 因为此后 `refCounted` 将不再有订阅者
    setTimeout(() => {
        console.log('observerB unsubscribed');
        subscription2.unsubscribe();
    }, 2000);
};

subscribeMutliBroadcast();



// const button = document.querySelector('button');
// const clickObservable = fromEvent(button, 'click');
//
// const subscription = clickObservable.pipe()
//     .pipe(
//         throttleTime(1000),
//         scan((count) => {
//             return count + 1
//         }, 0)
//     )
//     .subscribe((count) => {
//         console.log(`Clicked ${count} times`);
//         // subscription.unsubscribe();
//     });
//
//
//
// clickObservable.pipe(throttleTime(1000))
//     .pipe(scan(count => count + 1, 0))
//     .subscribe(count => console.log(`Clicked ${count} times`));
//
// console.log("22")
