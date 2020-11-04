const Subscription = {
    count: {
        subscribe(parent, args, { pubsub }, info) {
            let count = 0

            setInterval(() => {
                count++
                pubsub.publish('count', {
                    count
                })
            }, 1000)

            // asyncIterator fukce ktera prijma channel name
            return pubsub.asyncIterator('count')
        }
    }
}

export { Subscription as default }