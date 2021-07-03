import { z } from "zod";
import { IdType } from "../../Bot";

export const SubmissionNotificationSchema = z.object({
  idType: z.nativeEnum(IdType),
  id: z.string().min(1),
  lessonId: z.string().min(1),
  challengeTitle: z.string().min(1),
});

export type SubmissionNotification = z.infer<
  typeof SubmissionNotificationSchema
>;
