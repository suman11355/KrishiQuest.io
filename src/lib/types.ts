export type Crop = 'Wheat' | 'Corn' | 'Rice' | string;
export type AvatarId = 'avatar1' | 'avatar2' | 'avatar3';

export type UserProfile = {
  name: string;
  location: string;
  avatar: AvatarId;
  crop: Crop;
};

export type CalendarEvent = {
  date: string;
  title: string;
  description: string;
};
