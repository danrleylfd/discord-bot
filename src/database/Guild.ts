import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  id: String,
  name: String,
  icon: String,
  iconURL: String,

  welcomeChannel: String,
  byeChannel: String,
  commandChannel: String,
  feedbackChannel: String,
  logChannel: String,
  autoRoleUser: String,
  autoRoleBot: String,

  channelCreate: { type: Boolean, default: false },
  channelDelete: { type: Boolean, default: false },
  guildBanAdd: { type: Boolean, default: false },
  guildBanRemove: { type: Boolean, default: false },
  guildMemberAdd: { type: Boolean, default: false },
  guildMemberUpdate: { type: Boolean, default: false },
  guildMemberRemove: { type: Boolean, default: false },
  messageUpdate: { type: Boolean, default: false },
  messageDelete: { type: Boolean, default: false },
  roleCreate: { type: Boolean, default: false },
  roleUpdate: { type: Boolean, default: false },
  roleDelete: { type: Boolean, default: false },
});

export default mongoose.model('Guild', Schema);
