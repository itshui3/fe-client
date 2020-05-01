import Pusher from 'pusher-js';

const pusher = new Pusher('4e0f5e89608423d89cb2', {
  cluster: 'us2'
});

export default pusher;