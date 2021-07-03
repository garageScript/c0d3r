import { validatorFactory } from "../utils/validatorFactory";
import { SubmissionNotificationSchema } from "../zodSchemas/SubmissionNotification";
import { ChannelMessageSchema } from "../zodSchemas/ChannelMessage";
import { DirectMessageSchema } from "../zodSchemas/DirectMessage";

export const SubmissionNotificationValidator = validatorFactory(
  SubmissionNotificationSchema
);

export const ChannelMessageValidator = validatorFactory(ChannelMessageSchema);
export const DirectMessageValidator = validatorFactory(DirectMessageSchema);
