import Alert from 'react-s-alert';

export default (type, message) => {
    return Alert[type](`<span>${message}</span>`, {
        position: 'top-right',
        effect: 'bouncyflip',
        onShow: function () {

        },
        html: true,
        beep: false,
        timeout: 3000,
    });
};
