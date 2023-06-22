module.exports = {
  home: {
    Header: {
      home: {
        text: 'Home',
        url: '/',
        disabled: false,
      },
      commands: {
        text: 'Commands',
        url: '/',
        disabled: true,
      },
      tranfer: {
        text: 'Tranfer',
        url: '/dashboard#balance',
        disabled: false,
      },
      support: {
        text: 'Support',
        url: '',
        disabled: false,
      },
    },
    body: {
      p1: 'A multifunctional bot for helping Robux servers!',
      p2: 'Robux, Welcomer, Embed Messages, Logs, and more with an easy Dashboard!',
      SupportButton: {
        style: 'secondary',
        url: '',
        text: 'Support'
      },
      DashboardButton: {
        style: 'primary',
        url: '/dashboard',
        text: 'Dashboard'
      },
      LoginButton: {
        style: 'primary',
        url: '/login',
        text: 'Login'
      },
      LogoutButton: {
        style: 'danger',
        url: '/logout',
        text: 'Logout'
      },
      LeftImg: {
        url: 'https://cdn.discordapp.com/attachments/1116475279012003931/1120062108873281676/robux.png'
      }, 
    }
  },
}