import { z } from "zod";
import { IdType } from "../../Bot";

export const SubmissionNotificationSchema = z.object({
  idType: z.nativeEnum(IdType),
  id: z.string().min(1),
  notificationLessonId: z.string().min(1),
  lessonSlug: z.string().min(1),
  challengeTitle: z.string().min(1),
  includeDetails: z.boolean().optional().default(false),
});

export type SubmissionNotification = z.infer<
  typeof SubmissionNotificationSchema
>;
