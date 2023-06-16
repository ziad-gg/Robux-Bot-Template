  replyNoMention(options) {
    return new Promise((resolve, reject) => {

      const Routes = this.api.Routes;

      options.message_reference = {
        message_id: this.id,
        guild_id: this?.guild?.id,
        channel_id: this.channel.id,
        fail_if_not_exists: true
      };

      options.allowed_mentions = {
        replied_user: false
      };

      this.REST.post(Routes.channelMessages(this.channel.id), { body: options }).then(data => {
        this.replid = {
          message_id: data.id,
          guild_id: this.guild?.id,
          channel_id: this.channel.id,
          fail_if_not_exists: true,
        };
        resolve(new MessageBuilder(this.client, data, this.Application));
      });

    });
  };