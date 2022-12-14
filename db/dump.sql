--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3 (Ubuntu 14.3-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.3 (Ubuntu 14.3-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: seuUrl; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."seuUrl" (
    id integer NOT NULL,
    "usuarioId" integer NOT NULL,
    total bigint NOT NULL
);


ALTER TABLE public."seuUrl" OWNER TO postgres;

--
-- Name: seuUrl_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."seuUrl_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."seuUrl_id_seq" OWNER TO postgres;

--
-- Name: seuUrl_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."seuUrl_id_seq" OWNED BY public."seuUrl".id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "shortUrl" text NOT NULL,
    url text NOT NULL,
    "usuarioId" integer NOT NULL,
    visualizacao bigint NOT NULL,
    "seuUrlId" integer NOT NULL
);


ALTER TABLE public.urls OWNER TO postgres;

--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.urls_id_seq OWNER TO postgres;

--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    token text NOT NULL
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_id_seq OWNER TO postgres;

--
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;


--
-- Name: seuUrl id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."seuUrl" ALTER COLUMN id SET DEFAULT nextval('public."seuUrl_id_seq"'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);


--
-- Data for Name: seuUrl; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."seuUrl" (id, "usuarioId", total) FROM stdin;
4	18	12
5	21	0
6	22	0
7	24	0
3	17	16
8	28	0
9	29	0
\.


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.urls (id, "shortUrl", url, "usuarioId", visualizacao, "seuUrlId") FROM stdin;
3	bOpELubHk3Oigbth2wkxb	https://www.netflix.com/br/	17	0	3
4	KUgqccRm3iaSTH3-Iwlmb	https://www.netflix.com/br/	17	0	3
5	-_RjulOOBueS_EFDAQPpS	https://www.netflix.com/br/	17	0	3
1	Q06196daXKRjYAEGcVt4N	https://www.netflix.com/br/	17	12	3
6	o9akxHruIa-q_2deyCKoK	https://www.netflix.com/br/	18	13	4
2	RwSdP-z_xUaQwxHTECOZN	https://www.netflix.com/br/	17	4	3
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id, name, email, password, token) FROM stdin;
17	Daniel	daniel@driven.com.br	$2b$10$4PP4r1sDHpvJoYGCbLzIWuZITIQOzklps/fCWUb63sf6LP9tiFbQi	3f99a6d5-5baa-4806-ac9a-c93722e157d2
18	joao	joao@driven.com.br	$2b$10$gRmbXAaha.bdfjHaTXS0/.uHdGv42YK8KKkEg.UhCJoOUjpzH4ueS	7564c451-b608-4a3b-a260-f509eeb95db6
21	joao	joao4@driven.com.br	$2b$10$TTMnj12dDYznTMqHi7Pbe.ix7qtK5SNnM.VdLbP/HDIkjEkU1p4nW	db0cc9cf-bbed-467c-a0d2-4a24c04ccf73
22	joao	joao5@driven.com.br	$2b$10$ci3F/n868QkXEDkT/iOEaeee/7SlhJU1l4/5/q4S7Jyf..BFsfHm.	ebd1073d-339f-4045-ae7b-b9fb6c93641b
24	teste	teste@driven.com.br	$2b$10$Ehwpvgbq/jSwM8MDZNugTuv2OPud1/S4CMSxNQj/f0mMtIxc392tG	7437aca3-3a29-4d00-b460-c352d177c876
28	Joao	joa123@driven.com.br	$2b$10$reM4xwJKReQG.i0YbG.2uO4xwL.zSBMs9Ffbjci.IdUJmpFQN/b0e	59538f01-afff-4560-8e44-28538f845f81
29	Joao	joa1234@driven.com.br	$2b$10$J5xMLCsghZC2VNZsBhNyAOns.W1y/90CQMRx7duD7oaUJi/iD3shC	50f01239-7fcc-4ef1-95f6-ab592550dcc7
\.


--
-- Name: seuUrl_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."seuUrl_id_seq"', 9, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.urls_id_seq', 6, true);


--
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_seq', 29, true);


--
-- Name: seuUrl seuUrl_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."seuUrl"
    ADD CONSTRAINT "seuUrl_pkey" PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: usuario usuario_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_key UNIQUE (email);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- Name: seuUrl seuUrl_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."seuUrl"
    ADD CONSTRAINT "seuUrl_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public.usuario(id);


--
-- Name: urls urls_seuUrlId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_seuUrlId_fkey" FOREIGN KEY ("seuUrlId") REFERENCES public."seuUrl"(id);


--
-- Name: urls urls_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public.usuario(id);


--
-- PostgreSQL database dump complete
--

