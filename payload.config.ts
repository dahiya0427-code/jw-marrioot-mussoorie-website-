import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { BlogPosts } from "./collections/BlogPosts";
import { Bookings } from "./collections/Bookings";
import { Categories } from "./collections/Categories";
import { ConsultationRequests } from "./collections/ConsultationRequests";
import { Departments } from "./collections/Departments";
import { Events } from "./collections/Events";
import { Facilities } from "./collections/Facilities";
import { GalleryItems } from "./collections/GalleryItems";
import { LegalPages } from "./collections/LegalPages";
import { Media } from "./collections/Media";
import { Offers } from "./collections/Offers";
import { Pages } from "./collections/Pages";
import { RoomTypes } from "./collections/RoomTypes";
import { StaffUsers } from "./collections/StaffUsers";
import { Testimonials } from "./collections/Testimonials";
import { TickerItems } from "./collections/TickerItems";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: StaffUsers.slug,
    importMap: {
      baseDir: path.resolve(dirname, "app", "(payload)", "admin"),
    },
  },
  collections: [
    Pages,
    BlogPosts,
    Categories,
    Departments,
    Facilities,
    RoomTypes,
    Offers,
    Events,
    GalleryItems,
    Media,
    TickerItems,
    Testimonials,
    LegalPages,
    Bookings,
    ConsultationRequests,
    StaffUsers,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
});
