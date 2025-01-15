--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Classes; Type: TABLE; Schema: public; Owner: paj
--

CREATE TABLE public."Classes" (
    "idClasses" uuid DEFAULT gen_random_uuid() NOT NULL,
    classes character varying(255) NOT NULL
);


ALTER TABLE public."Classes" OWNER TO paj;

--
-- Name: Evenements; Type: TABLE; Schema: public; Owner: paj
--

CREATE TABLE public."Evenements" (
    "idEvenements" uuid DEFAULT gen_random_uuid() NOT NULL,
    "idTypesEvenements" uuid,
    commentaire text,
    date timestamp without time zone NOT NULL,
    duree text
);


ALTER TABLE public."Evenements" OWNER TO paj;

--
-- Name: Fichiers; Type: TABLE; Schema: public; Owner: paj
--

CREATE TABLE public."Fichiers" (
    "idFichiers" uuid DEFAULT gen_random_uuid() NOT NULL,
    "idEvenements" uuid,
    "idFormatsFichiers" uuid,
    chemin text NOT NULL,
    nom text NOT NULL
);


ALTER TABLE public."Fichiers" OWNER TO paj;

--
-- Name: FormatsFichiers; Type: TABLE; Schema: public; Owner: paj
--

CREATE TABLE public."FormatsFichiers" (
    "idFormatsFichiers" uuid DEFAULT gen_random_uuid() NOT NULL,
    "formatsFichiers" character varying(255) NOT NULL
);


ALTER TABLE public."FormatsFichiers" OWNER TO paj;

--
-- Name: Gestions; Type: TABLE; Schema: public; Owner: paj
--

CREATE TABLE public."Gestions" (
    "idGestions" uuid DEFAULT gen_random_uuid() NOT NULL,
    "idUtilisateurs" uuid,
    "idEvenements" uuid,
    "idStatusGestions" uuid
);


ALTER TABLE public."Gestions" OWNER TO paj;

--
-- Name: Notifications; Type: TABLE; Schema: public; Owner: paj
--

CREATE TABLE public."Notifications" (
    "idNotifications" uuid DEFAULT gen_random_uuid() NOT NULL,
    "idStatusNotifications" uuid NOT NULL,
    message text NOT NULL,
    "idRoles" uuid NOT NULL,
    "idGestions" uuid NOT NULL
);


ALTER TABLE public."Notifications" OWNER TO paj;

--
-- Name: Roles; Type: TABLE; Schema: public; Owner: paj
--

CREATE TABLE public."Roles" (
    "idRoles" uuid DEFAULT gen_random_uuid() NOT NULL,
    roles character varying(255) NOT NULL
);


ALTER TABLE public."Roles" OWNER TO paj;

--
-- Name: StatusGestions; Type: TABLE; Schema: public; Owner: paj
--

CREATE TABLE public."StatusGestions" (
    "idStatusGestions" uuid DEFAULT gen_random_uuid() NOT NULL,
    "statusGestions" character varying(255) NOT NULL
);


ALTER TABLE public."StatusGestions" OWNER TO paj;

--
-- Name: StatusNotifications; Type: TABLE; Schema: public; Owner: paj
--

CREATE TABLE public."StatusNotifications" (
    "idStatusNotifications" uuid DEFAULT gen_random_uuid() NOT NULL,
    "statusNotifications" character varying(255) NOT NULL
);


ALTER TABLE public."StatusNotifications" OWNER TO paj;

--
-- Name: TypesEvenements; Type: TABLE; Schema: public; Owner: paj
--

CREATE TABLE public."TypesEvenements" (
    "idTypesEvenements" uuid DEFAULT gen_random_uuid() NOT NULL,
    "typesEvenements" character varying(255) NOT NULL
);


ALTER TABLE public."TypesEvenements" OWNER TO paj;

--
-- Name: Utilisateurs; Type: TABLE; Schema: public; Owner: paj
--

CREATE TABLE public."Utilisateurs" (
    "idUtilisateurs" uuid DEFAULT gen_random_uuid() NOT NULL,
    "idRoles" uuid,
    "idClasses" uuid,
    nom character varying(255) NOT NULL,
    prenom character varying(255) NOT NULL,
    mail character varying(255) NOT NULL,
    mdp character varying(255) NOT NULL,
    "resetMdp" boolean DEFAULT false,
    "codeUnique" character varying(255),
    "nbRetards" integer,
    "tempsTotRetards" integer,
    "nbAbsences" integer,
    "tempsTotAbsences" integer,
    "semestreRetardsAbsenses" text,
    "nbEssais" integer,
    desactiver boolean
);


ALTER TABLE public."Utilisateurs" OWNER TO paj;

--
-- Data for Name: Classes; Type: TABLE DATA; Schema: public; Owner: paj
--

COPY public."Classes" ("idClasses", classes) FROM stdin;
c1bdae03-6d0a-43ee-9cb6-07e4c784e6bc	AP3
c0df4e9f-bb23-4e7b-a467-5e8ab1c2891c	AP4
2ed57799-f34b-4fd4-847b-0e3249602d16	AP5
63bd9c7a-2e6f-474f-9d71-9968a9dafec7	ADI1
\.


--
-- Data for Name: Evenements; Type: TABLE DATA; Schema: public; Owner: paj
--

COPY public."Evenements" ("idEvenements", "idTypesEvenements", commentaire, date, duree) FROM stdin;
498531fe-e1ea-41db-8ad2-4890d3d45f0f	9288f3a0-4eb4-45f4-9bc6-8b5ba87ffea5	Obligatoire de prendre une photo	2024-12-20 09:58:29.033	15
5482df05-3902-425d-9d1b-d885ffe9fdff	57bbe056-b0b9-434f-9900-81d6ff10435c	Impossible de circuler	2024-12-20 07:30:11.701	1 Demi-Journée
1150d31d-003c-4087-adc2-d05ac5ad83d5	57bbe056-b0b9-434f-9900-81d6ff10435c	test	2025-01-09 07:41:52.381	1 Journée
1be64e4c-d771-43d6-8178-97db49ecfb46	57bbe056-b0b9-434f-9900-81d6ff10435c	test	2025-01-10 08:08:58.349	1 Journée
1af7db8b-0fd6-4c47-b303-ab27969fea53	57bbe056-b0b9-434f-9900-81d6ff10435c	trtr	2025-01-09 13:06:41.021	1 Journée
7ae06bfb-f38d-4934-bde7-059d93b8fccf	57bbe056-b0b9-434f-9900-81d6ff10435c	trtrtr	2025-01-11 13:06:41.021	3 Journée
\.


--
-- Data for Name: Fichiers; Type: TABLE DATA; Schema: public; Owner: paj
--

COPY public."Fichiers" ("idFichiers", "idEvenements", "idFormatsFichiers", chemin, nom) FROM stdin;
8bcbeaee-14d1-42b7-95bb-ae4f46bed061	5482df05-3902-425d-9d1b-d885ffe9fdff	6f3728e4-0c59-441c-9ae5-9d5e68c8a912	/home/paj/documents/jonathan.roy@student.junia.com/pexels-simon-berger-1183099.jpg	pexels-simon-berger-1183099.jpg
b462735f-87cc-4e4d-9ebc-d8478ee43297	498531fe-e1ea-41db-8ad2-4890d3d45f0f	6f3728e4-0c59-441c-9ae5-9d5e68c8a912	/home/paj/documents/jonathan.roy@student.junia.com/pexels-yuliya-strizhkina-1198802.jpg	pexels-yuliya-strizhkina-1198802.jpg
\.


--
-- Data for Name: FormatsFichiers; Type: TABLE DATA; Schema: public; Owner: paj
--

COPY public."FormatsFichiers" ("idFormatsFichiers", "formatsFichiers") FROM stdin;
701a6ae8-fad3-4251-b497-242745b0a447	PDF
7bd7785a-a215-40a2-8071-06ef16c11432	JPEG
521ea922-bfd0-486c-8b1d-749c9e137930	PNG
6f3728e4-0c59-441c-9ae5-9d5e68c8a912	JPG
\.


--
-- Data for Name: Gestions; Type: TABLE DATA; Schema: public; Owner: paj
--

COPY public."Gestions" ("idGestions", "idUtilisateurs", "idEvenements", "idStatusGestions") FROM stdin;
73b3cab2-9018-40cf-8f15-730188e1799d	b88b5c7f-57bc-4a87-aa53-dd485d25d998	5482df05-3902-425d-9d1b-d885ffe9fdff	f8af1ef6-aebc-4bd7-ac01-f0706d127827
091d125c-d014-4815-a5a2-0065450706ad	b88b5c7f-57bc-4a87-aa53-dd485d25d998	1150d31d-003c-4087-adc2-d05ac5ad83d5	f8af1ef6-aebc-4bd7-ac01-f0706d127827
c3e49876-9a20-4804-8c0f-a4f241889029	b88b5c7f-57bc-4a87-aa53-dd485d25d998	498531fe-e1ea-41db-8ad2-4890d3d45f0f	02b0baa4-f926-489f-9d1f-721fa6273621
230d7f1a-3207-447e-b1e5-357b4d150ce7	b88b5c7f-57bc-4a87-aa53-dd485d25d998	1be64e4c-d771-43d6-8178-97db49ecfb46	02b0baa4-f926-489f-9d1f-721fa6273621
048eff14-df39-45e2-9075-2efd8fbf9808	b88b5c7f-57bc-4a87-aa53-dd485d25d998	7ae06bfb-f38d-4934-bde7-059d93b8fccf	7cfa0f7f-7779-464d-99bf-f1477a88a742
f20b8a75-8d14-4e81-b805-0faa1fe202ab	b88b5c7f-57bc-4a87-aa53-dd485d25d998	1af7db8b-0fd6-4c47-b303-ab27969fea53	02b0baa4-f926-489f-9d1f-721fa6273621
\.


--
-- Data for Name: Notifications; Type: TABLE DATA; Schema: public; Owner: paj
--

COPY public."Notifications" ("idNotifications", "idStatusNotifications", message, "idRoles", "idGestions") FROM stdin;
933fde91-6144-402d-b37d-1588736cd038	315fc597-b11a-49e7-bce2-80c089cc95cc	Création évènementRetard	ee02fea7-1b37-46a5-b5d8-e86d02c90e32	c3e49876-9a20-4804-8c0f-a4f241889029
69f979cd-cf4a-46d7-9671-d81975397056	315fc597-b11a-49e7-bce2-80c089cc95cc	Création évènementAbsence	ee02fea7-1b37-46a5-b5d8-e86d02c90e32	230d7f1a-3207-447e-b1e5-357b4d150ce7
8b3df603-7d68-43ce-b2a7-3f4f78e59181	315fc597-b11a-49e7-bce2-80c089cc95cc	Création évènementAbsence	ee02fea7-1b37-46a5-b5d8-e86d02c90e32	f20b8a75-8d14-4e81-b805-0faa1fe202ab
492bb16d-fc4a-4262-814e-3ed2dd601401	315fc597-b11a-49e7-bce2-80c089cc95cc	Création évènementAbsence	ee02fea7-1b37-46a5-b5d8-e86d02c90e32	048eff14-df39-45e2-9075-2efd8fbf9808
22b41200-9594-4264-8889-3632c6205fad	af10241b-3841-44e9-9e25-99d770de36d5	piece valide	4a8b3442-2048-4ef7-b17f-8f42311ddff5	c3e49876-9a20-4804-8c0f-a4f241889029
824edfbe-4d84-4e1e-95dc-8cb19d3b787c	af10241b-3841-44e9-9e25-99d770de36d5	Merci de me transmettre le justificatif	4a8b3442-2048-4ef7-b17f-8f42311ddff5	230d7f1a-3207-447e-b1e5-357b4d150ce7
46cde9ac-f429-48a6-a663-449dd126a710	af10241b-3841-44e9-9e25-99d770de36d5	Création évènementRetard	4a8b3442-2048-4ef7-b17f-8f42311ddff5	c3e49876-9a20-4804-8c0f-a4f241889029
17376d5c-9452-4a4b-b959-81f9895cc007	af10241b-3841-44e9-9e25-99d770de36d5	Création évènementAbsence	4a8b3442-2048-4ef7-b17f-8f42311ddff5	230d7f1a-3207-447e-b1e5-357b4d150ce7
438c7e32-dc74-46d9-a552-0445645892a9	af10241b-3841-44e9-9e25-99d770de36d5	Merci de me transmettre le justificatif	4a8b3442-2048-4ef7-b17f-8f42311ddff5	230d7f1a-3207-447e-b1e5-357b4d150ce7
4c414077-4464-4ada-976d-24e12340cecd	af10241b-3841-44e9-9e25-99d770de36d5	Création évènementAbsence	4a8b3442-2048-4ef7-b17f-8f42311ddff5	048eff14-df39-45e2-9075-2efd8fbf9808
294f5603-c5c9-450f-a839-13f907e2c382	af10241b-3841-44e9-9e25-99d770de36d5	Création évènementAbsence	4a8b3442-2048-4ef7-b17f-8f42311ddff5	091d125c-d014-4815-a5a2-0065450706ad
a3a63516-9b10-46a9-aae5-67a6b9a4ceb3	af10241b-3841-44e9-9e25-99d770de36d5	Merci de me transmettre le justificatif	4a8b3442-2048-4ef7-b17f-8f42311ddff5	f20b8a75-8d14-4e81-b805-0faa1fe202ab
b24c0801-24d7-457d-8696-e5c551fad34e	af10241b-3841-44e9-9e25-99d770de36d5	Création évènementAbsence	4a8b3442-2048-4ef7-b17f-8f42311ddff5	f20b8a75-8d14-4e81-b805-0faa1fe202ab
94ce03b7-d246-44cb-ac1d-0c36571f4879	af10241b-3841-44e9-9e25-99d770de36d5	Création évènementAbsence	4a8b3442-2048-4ef7-b17f-8f42311ddff5	73b3cab2-9018-40cf-8f15-730188e1799d
1e5569d7-d6b3-47b2-9e38-d7535859b769	af10241b-3841-44e9-9e25-99d770de36d5	justif stp	4a8b3442-2048-4ef7-b17f-8f42311ddff5	048eff14-df39-45e2-9075-2efd8fbf9808
59f688a7-e5f7-4509-98ac-42d0cbcd4253	315fc597-b11a-49e7-bce2-80c089cc95cc	ok	4a8b3442-2048-4ef7-b17f-8f42311ddff5	f20b8a75-8d14-4e81-b805-0faa1fe202ab
\.


--
-- Data for Name: Roles; Type: TABLE DATA; Schema: public; Owner: paj
--

COPY public."Roles" ("idRoles", roles) FROM stdin;
ee02fea7-1b37-46a5-b5d8-e86d02c90e32	Admin
4a8b3442-2048-4ef7-b17f-8f42311ddff5	Etudiant
\.


--
-- Data for Name: StatusGestions; Type: TABLE DATA; Schema: public; Owner: paj
--

COPY public."StatusGestions" ("idStatusGestions", "statusGestions") FROM stdin;
f8af1ef6-aebc-4bd7-ac01-f0706d127827	En attente
02b0baa4-f926-489f-9d1f-721fa6273621	Valider
7cfa0f7f-7779-464d-99bf-f1477a88a742	Refuser
\.


--
-- Data for Name: StatusNotifications; Type: TABLE DATA; Schema: public; Owner: paj
--

COPY public."StatusNotifications" ("idStatusNotifications", "statusNotifications") FROM stdin;
315fc597-b11a-49e7-bce2-80c089cc95cc	Non lue
af10241b-3841-44e9-9e25-99d770de36d5	Lue
\.


--
-- Data for Name: TypesEvenements; Type: TABLE DATA; Schema: public; Owner: paj
--

COPY public."TypesEvenements" ("idTypesEvenements", "typesEvenements") FROM stdin;
57bbe056-b0b9-434f-9900-81d6ff10435c	Absence
9288f3a0-4eb4-45f4-9bc6-8b5ba87ffea5	Retard
\.


--
-- Data for Name: Utilisateurs; Type: TABLE DATA; Schema: public; Owner: paj
--

COPY public."Utilisateurs" ("idUtilisateurs", "idRoles", "idClasses", nom, prenom, mail, mdp, "resetMdp", "codeUnique", "nbRetards", "tempsTotRetards", "nbAbsences", "tempsTotAbsences", "semestreRetardsAbsenses", "nbEssais", desactiver) FROM stdin;
b88b5c7f-57bc-4a87-aa53-dd485d25d998	4a8b3442-2048-4ef7-b17f-8f42311ddff5	2ed57799-f34b-4fd4-847b-0e3249602d16	Roy	Jonathan	jonathan.roy@student.junia.com	$2b$10$eRI.G72DeMP3ip9xcnLTMeFto3BaG/ZfUmI93TaJ1r0KnTCRVuxd6	f	\N	0	0	0	0		0	f
0c112936-e7b2-4e77-a290-659c2dfd10aa	ee02fea7-1b37-46a5-b5d8-e86d02c90e32	\N	Paul	Laetitia	laetitia.paul@junia.com	$2b$10$/SnV22FQbYUiV5hi5rc1mumZWjdNBQzM/ByVXbtfQxooUkQIFQGI2	f	\N	\N	\N	\N	\N	\N	0	f
\.


--
-- Name: Classes classes_pkey; Type: CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."Classes"
    ADD CONSTRAINT classes_pkey PRIMARY KEY ("idClasses");


--
-- Name: Evenements evenements_pkey; Type: CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."Evenements"
    ADD CONSTRAINT evenements_pkey PRIMARY KEY ("idEvenements");


--
-- Name: Fichiers fichiers_pkey; Type: CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."Fichiers"
    ADD CONSTRAINT fichiers_pkey PRIMARY KEY ("idFichiers");


--
-- Name: FormatsFichiers formatsfichiers_pkey; Type: CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."FormatsFichiers"
    ADD CONSTRAINT formatsfichiers_pkey PRIMARY KEY ("idFormatsFichiers");


--
-- Name: Gestions gestions_pkey; Type: CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."Gestions"
    ADD CONSTRAINT gestions_pkey PRIMARY KEY ("idGestions");


--
-- Name: Notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT notifications_pkey PRIMARY KEY ("idNotifications");


--
-- Name: Roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT roles_pkey PRIMARY KEY ("idRoles");


--
-- Name: StatusGestions statusgestions_pkey; Type: CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."StatusGestions"
    ADD CONSTRAINT statusgestions_pkey PRIMARY KEY ("idStatusGestions");


--
-- Name: StatusNotifications statusnotifications_pkey; Type: CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."StatusNotifications"
    ADD CONSTRAINT statusnotifications_pkey PRIMARY KEY ("idStatusNotifications");


--
-- Name: TypesEvenements typesevenements_pkey; Type: CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."TypesEvenements"
    ADD CONSTRAINT typesevenements_pkey PRIMARY KEY ("idTypesEvenements");


--
-- Name: Utilisateurs utilisateurs_mail_key; Type: CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."Utilisateurs"
    ADD CONSTRAINT utilisateurs_mail_key UNIQUE (mail);


--
-- Name: Utilisateurs utilisateurs_pkey; Type: CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."Utilisateurs"
    ADD CONSTRAINT utilisateurs_pkey PRIMARY KEY ("idUtilisateurs");


--
-- Name: fki_notifications_idgestions_fkey; Type: INDEX; Schema: public; Owner: paj
--

CREATE INDEX fki_notifications_idgestions_fkey ON public."Notifications" USING btree ("idGestions");


--
-- Name: fki_notifications_idroles_fkey; Type: INDEX; Schema: public; Owner: paj
--

CREATE INDEX fki_notifications_idroles_fkey ON public."Notifications" USING btree ("idRoles");


--
-- Name: Evenements evenements_idtype_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."Evenements"
    ADD CONSTRAINT evenements_idtype_fkey FOREIGN KEY ("idTypesEvenements") REFERENCES public."TypesEvenements"("idTypesEvenements");


--
-- Name: Fichiers fichiers_idevenements_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."Fichiers"
    ADD CONSTRAINT fichiers_idevenements_fkey FOREIGN KEY ("idEvenements") REFERENCES public."Evenements"("idEvenements");


--
-- Name: Fichiers fichiers_idformats_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."Fichiers"
    ADD CONSTRAINT fichiers_idformats_fkey FOREIGN KEY ("idFormatsFichiers") REFERENCES public."FormatsFichiers"("idFormatsFichiers");


--
-- Name: Gestions gestions_idevenements_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."Gestions"
    ADD CONSTRAINT gestions_idevenements_fkey FOREIGN KEY ("idEvenements") REFERENCES public."Evenements"("idEvenements");


--
-- Name: Gestions gestions_idstatusgestions_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."Gestions"
    ADD CONSTRAINT gestions_idstatusgestions_fkey FOREIGN KEY ("idStatusGestions") REFERENCES public."StatusGestions"("idStatusGestions");


--
-- Name: Gestions gestions_idutilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."Gestions"
    ADD CONSTRAINT gestions_idutilisateurs_fkey FOREIGN KEY ("idUtilisateurs") REFERENCES public."Utilisateurs"("idUtilisateurs");


--
-- Name: Notifications notifications_idgestions_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT notifications_idgestions_fkey FOREIGN KEY ("idGestions") REFERENCES public."Gestions"("idGestions") NOT VALID;


--
-- Name: Notifications notifications_idroles_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT notifications_idroles_fkey FOREIGN KEY ("idRoles") REFERENCES public."Roles"("idRoles") NOT VALID;


--
-- Name: Notifications notifications_idstatusnotifications_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT notifications_idstatusnotifications_fkey FOREIGN KEY ("idStatusNotifications") REFERENCES public."StatusNotifications"("idStatusNotifications");


--
-- Name: Utilisateurs utilisateurs_idclasses_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."Utilisateurs"
    ADD CONSTRAINT utilisateurs_idclasses_fkey FOREIGN KEY ("idClasses") REFERENCES public."Classes"("idClasses");


--
-- Name: Utilisateurs utilisateurs_idroles_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paj
--

ALTER TABLE ONLY public."Utilisateurs"
    ADD CONSTRAINT utilisateurs_idroles_fkey FOREIGN KEY ("idRoles") REFERENCES public."Roles"("idRoles");


--
-- PostgreSQL database dump complete
--

