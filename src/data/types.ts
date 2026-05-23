type MiracleMetadata = {
  country: string;
  city: string;
  year: string;
  categories: string[];
  coordinates: [number, number][];
  endpoint: string;
  path: string;
}

type MiracleImage = {
  caption: string;
  path: string;
}

type Resource = {
  label: string;
  path: string;
  endpoint: string;
}

type NotificationAction = {
  label: string;
  path: string;
  endpoint: string;
}

type NotificationObject = {
  title: string;
  message: string;
  actions: NotificationAction[];
}

type Miracle = {
  country: string;
  city: string;
  year: string;
  categories: string[];
  coordinates: [number, number][];
  endpoint: string;
  path: string;
  title: string;
  intro: string;
  overview: string;
  images: MiracleImage[];
  copyright: string;
  pdfLink: string;
  notification: NotificationObject;
  resources: Resource[];
}

export type {
  MiracleMetadata,
  Miracle,
}