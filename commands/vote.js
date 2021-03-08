module.exports = {
    name: 'vote',
    description: "Polls a Post",
    execute(message, args){
        message.react(":a:");
        message.react(":regional_indicator_b:");
    }
}