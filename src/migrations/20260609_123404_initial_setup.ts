import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en');
  CREATE TYPE "public"."enum_umkm_kategori" AS ENUM('makanan', 'minuman', 'kerajinan', 'jasa', 'pertanian', 'lainnya');
  CREATE TYPE "public"."enum_wisata_kategori" AS ENUM('alam', 'budaya', 'religi', 'agrowisata', 'buatan', 'lainnya');
  CREATE TYPE "public"."enum_galeri_kategori" AS ENUM('kegiatan', 'alam', 'infrastruktur', 'panen', 'budaya');
  CREATE TYPE "public"."enum_kegiatan_kategori" AS ENUM('kesehatan', 'pertanian', 'sosial', 'pemerintahan', 'pemuda');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "umkm_foto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"gambar_id" integer NOT NULL
  );
  
  CREATE TABLE "umkm" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nama" varchar NOT NULL,
  	"kategori" "enum_umkm_kategori" NOT NULL,
  	"deskripsi" jsonb,
  	"nomor_w_a" varchar,
  	"pesan_w_a" varchar,
  	"featured" boolean DEFAULT false,
  	"aktif" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "wisata_foto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"gambar_id" integer NOT NULL
  );
  
  CREATE TABLE "wisata" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nama" varchar NOT NULL,
  	"kategori" "enum_wisata_kategori" NOT NULL,
  	"deskripsi" jsonb,
  	"tiket" varchar,
  	"jam_buka" varchar,
  	"nomor_w_a" varchar,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "galeri" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"foto_id" integer NOT NULL,
  	"judul" varchar NOT NULL,
  	"kategori" "enum_galeri_kategori" NOT NULL,
  	"tanggal" timestamp(3) with time zone NOT NULL,
  	"keterangan" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "perangkat_desa" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nama" varchar NOT NULL,
  	"jabatan" varchar NOT NULL,
  	"foto_id" integer NOT NULL,
  	"urutan" numeric NOT NULL,
  	"kontak" varchar,
  	"aktif" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "kegiatan" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"judul" varchar NOT NULL,
  	"kategori" "enum_kegiatan_kategori" NOT NULL,
  	"tanggal" timestamp(3) with time zone NOT NULL,
  	"waktu" varchar NOT NULL,
  	"lokasi" varchar NOT NULL,
  	"deskripsi" jsonb,
  	"dokumen_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pengumuman" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"judul" varchar NOT NULL,
  	"konten" jsonb NOT NULL,
  	"tanggal_terbit" timestamp(3) with time zone NOT NULL,
  	"tanggal_berakhir" timestamp(3) with time zone,
  	"lampiran_id" integer,
  	"penting" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"umkm_id" integer,
  	"wisata_id" integer,
  	"galeri_id" integer,
  	"perangkat_desa_id" integer,
  	"kegiatan_id" integer,
  	"pengumuman_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "hero_beranda" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"foto_hero_id" integer NOT NULL,
  	"tagline" varchar NOT NULL,
  	"deskripsi" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "sambutan_kades" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"foto_id" integer NOT NULL,
  	"nama" varchar NOT NULL,
  	"jabatan" varchar DEFAULT 'Kepala Desa Gongseng' NOT NULL,
  	"teks" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "profil_desa" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"sejarah" jsonb NOT NULL,
  	"visi" jsonb NOT NULL,
  	"misi" jsonb NOT NULL,
  	"deskripsi_geografis" jsonb NOT NULL,
  	"luas_wilayah" varchar,
  	"peta_embed" varchar,
  	"potensi" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "data_demografi" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"jumlah_penduduk" numeric,
  	"jumlah_k_k" numeric,
  	"jumlah_laki_laki" numeric,
  	"jumlah_perempuan" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "kontak_sosmed" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nomor_w_a" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"alamat" varchar NOT NULL,
  	"instagram" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "apbdes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"pendapatan" numeric,
  	"belanja" numeric,
  	"tahun" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "umkm_foto" ADD CONSTRAINT "umkm_foto_gambar_id_media_id_fk" FOREIGN KEY ("gambar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "umkm_foto" ADD CONSTRAINT "umkm_foto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."umkm"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wisata_foto" ADD CONSTRAINT "wisata_foto_gambar_id_media_id_fk" FOREIGN KEY ("gambar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "wisata_foto" ADD CONSTRAINT "wisata_foto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wisata"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "galeri" ADD CONSTRAINT "galeri_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "perangkat_desa" ADD CONSTRAINT "perangkat_desa_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kegiatan" ADD CONSTRAINT "kegiatan_dokumen_id_media_id_fk" FOREIGN KEY ("dokumen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pengumuman" ADD CONSTRAINT "pengumuman_lampiran_id_media_id_fk" FOREIGN KEY ("lampiran_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_umkm_fk" FOREIGN KEY ("umkm_id") REFERENCES "public"."umkm"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_wisata_fk" FOREIGN KEY ("wisata_id") REFERENCES "public"."wisata"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_galeri_fk" FOREIGN KEY ("galeri_id") REFERENCES "public"."galeri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_perangkat_desa_fk" FOREIGN KEY ("perangkat_desa_id") REFERENCES "public"."perangkat_desa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_kegiatan_fk" FOREIGN KEY ("kegiatan_id") REFERENCES "public"."kegiatan"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pengumuman_fk" FOREIGN KEY ("pengumuman_id") REFERENCES "public"."pengumuman"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_beranda" ADD CONSTRAINT "hero_beranda_foto_hero_id_media_id_fk" FOREIGN KEY ("foto_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sambutan_kades" ADD CONSTRAINT "sambutan_kades_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "umkm_foto_order_idx" ON "umkm_foto" USING btree ("_order");
  CREATE INDEX "umkm_foto_parent_id_idx" ON "umkm_foto" USING btree ("_parent_id");
  CREATE INDEX "umkm_foto_gambar_idx" ON "umkm_foto" USING btree ("gambar_id");
  CREATE INDEX "umkm_updated_at_idx" ON "umkm" USING btree ("updated_at");
  CREATE INDEX "umkm_created_at_idx" ON "umkm" USING btree ("created_at");
  CREATE INDEX "wisata_foto_order_idx" ON "wisata_foto" USING btree ("_order");
  CREATE INDEX "wisata_foto_parent_id_idx" ON "wisata_foto" USING btree ("_parent_id");
  CREATE INDEX "wisata_foto_gambar_idx" ON "wisata_foto" USING btree ("gambar_id");
  CREATE INDEX "wisata_updated_at_idx" ON "wisata" USING btree ("updated_at");
  CREATE INDEX "wisata_created_at_idx" ON "wisata" USING btree ("created_at");
  CREATE INDEX "galeri_foto_idx" ON "galeri" USING btree ("foto_id");
  CREATE INDEX "galeri_updated_at_idx" ON "galeri" USING btree ("updated_at");
  CREATE INDEX "galeri_created_at_idx" ON "galeri" USING btree ("created_at");
  CREATE INDEX "perangkat_desa_foto_idx" ON "perangkat_desa" USING btree ("foto_id");
  CREATE INDEX "perangkat_desa_updated_at_idx" ON "perangkat_desa" USING btree ("updated_at");
  CREATE INDEX "perangkat_desa_created_at_idx" ON "perangkat_desa" USING btree ("created_at");
  CREATE INDEX "kegiatan_dokumen_idx" ON "kegiatan" USING btree ("dokumen_id");
  CREATE INDEX "kegiatan_updated_at_idx" ON "kegiatan" USING btree ("updated_at");
  CREATE INDEX "kegiatan_created_at_idx" ON "kegiatan" USING btree ("created_at");
  CREATE INDEX "pengumuman_lampiran_idx" ON "pengumuman" USING btree ("lampiran_id");
  CREATE INDEX "pengumuman_updated_at_idx" ON "pengumuman" USING btree ("updated_at");
  CREATE INDEX "pengumuman_created_at_idx" ON "pengumuman" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_umkm_id_idx" ON "payload_locked_documents_rels" USING btree ("umkm_id");
  CREATE INDEX "payload_locked_documents_rels_wisata_id_idx" ON "payload_locked_documents_rels" USING btree ("wisata_id");
  CREATE INDEX "payload_locked_documents_rels_galeri_id_idx" ON "payload_locked_documents_rels" USING btree ("galeri_id");
  CREATE INDEX "payload_locked_documents_rels_perangkat_desa_id_idx" ON "payload_locked_documents_rels" USING btree ("perangkat_desa_id");
  CREATE INDEX "payload_locked_documents_rels_kegiatan_id_idx" ON "payload_locked_documents_rels" USING btree ("kegiatan_id");
  CREATE INDEX "payload_locked_documents_rels_pengumuman_id_idx" ON "payload_locked_documents_rels" USING btree ("pengumuman_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "hero_beranda_foto_hero_idx" ON "hero_beranda" USING btree ("foto_hero_id");
  CREATE INDEX "sambutan_kades_foto_idx" ON "sambutan_kades" USING btree ("foto_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "umkm_foto" CASCADE;
  DROP TABLE "umkm" CASCADE;
  DROP TABLE "wisata_foto" CASCADE;
  DROP TABLE "wisata" CASCADE;
  DROP TABLE "galeri" CASCADE;
  DROP TABLE "perangkat_desa" CASCADE;
  DROP TABLE "kegiatan" CASCADE;
  DROP TABLE "pengumuman" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "hero_beranda" CASCADE;
  DROP TABLE "sambutan_kades" CASCADE;
  DROP TABLE "profil_desa" CASCADE;
  DROP TABLE "data_demografi" CASCADE;
  DROP TABLE "kontak_sosmed" CASCADE;
  DROP TABLE "apbdes" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_umkm_kategori";
  DROP TYPE "public"."enum_wisata_kategori";
  DROP TYPE "public"."enum_galeri_kategori";
  DROP TYPE "public"."enum_kegiatan_kategori";`)
}
