--
-- Database: 'vm2014'
--

-- --------------------------------------------------------
-- --------------------------------------------------------

--
-- The 'wm2014_match' table
--

DROP TABLE IF EXISTS vm2014_match;
CREATE TABLE IF NOT EXISTS vm2014_match (
  id integer NOT NULL,
  borta text,
  typ text,
  hemma text,
  beskrivning text,
  resultat text,
  datum timestamp without time zone,
  grupp text,
  bet integer,
  phase integer,
  image text,
  CONSTRAINT id_match PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
); ALTER TABLE vm2014_match
  OWNER TO gfwjbvprahvcbm;


--
-- All matches for the world cup
--

INSERT INTO vm2014_match (id, borta, typ, hemma, beskrivning, resultat, datum, grupp, bet, phase, image) VALUES
(1,'M','Croatia','Brazil','','','2014-06-12 22:00:00','A',1,1,'neymar0'),
(2,'M','Cameroon','Mexico','','','2014-06-13 18:00:00','A',2,1,'etoo'),
(3,'M','Netherlands','Spain','','','2014-06-13 21:00:00','B',3,1,'etoo'),
(4,'M','Australia','Chile','','','2014-06-13 23:59:59','B',4,1,'etoo'),
(5,'M','Greece','Colombia','','','2014-06-14 18:00:00','C',5,1,'james'),
(6,'M','Costa Rica','Uruguay','','','2014-06-14 21:00:00','D',6,1,'james'),
(7,'M','Japan','Ivory Coast','','','2014-06-15 03:00:00','C',7,1,'dd'),
(8,'M','Italy','England','','','2014-06-14 23:59:59','D',8,1,'james'), 
(9,'M','Ecuador','Switzerland','','2:3','2014-06-15 18:00:00','E',9,1,'dd'),
(10,'M','Honduras','France','','','2014-06-15 21:00:00','E',10,1,'dd'),
(11,'M','Bosnia and Herzegovina','Argentina','','','2014-06-15 23:59:59','F',11,1,'dd'),
(12,'M','Portugal','Germany','','','2014-06-16 18:00:00','G',12,1,'ronaldo'),
(13,'M','Nigeria','Iran','','','2014-06-16 21:00:00','F',13,1,'ronaldo'),
(14,'M','United States','Ghana','','','2014-06-16 23:59:59','G',14,1,'ronaldo'),
(15,'M','Algeria','Belgium','','','2014-06-17 18:00:00','H',15,1,'hazard'),
(16,'M','Mexico','Brazil','','','2014-06-17 21:00:00','A',16,1,'hazard'),
(17,'M','South Korea','Russia','','','2014-06-17 23:59:59','H',17,1,'hazard'),
(18,'M','Netherlands','Australia','','','2014-06-18 18:00:00','B',18,1,'robben'),
(19,'M','Croatia','Cameroon','','','2014-06-18 23:59:59','A',19,1,'robben'),
(20,'M','Chile','Spain','','','2014-06-18 21:00:00','B',20,1,'robben'),
(21,'M','Ivory Coast','Colombia','','','2014-06-19 18:00:00','C',21,1,'yaya'),
(22,'M','England','Uruguay','','','2014-06-19 21:00:00','D',22,1,'yaya'),
(23,'M','Greece','Japan','','','2014-06-19 23:59:59','C',23,1,'yaya'),
(24,'M','Costa Rica','Italy','','','2014-06-20 18:00:00','D',24,1,'balotelli'),
(25,'M','France','Switzerland','','','2014-06-20 21:00:00','E',25,1,'balotelli'),
(26,'M','Ecuador','Honduras','','','2014-06-20 23:59:59','E',26,1,'balotelli'),
(27,'M','Iran','Argentina','','','2014-06-21 18:00:00','F',27,1,'messi'),
(28,'M','Ghana','Germany','','','2014-06-21 21:00:00','G',28,1,'messi'),
(29,'M','Bosnia and Herzegovina','Nigeria','','','2014-06-21 23:59:59','F',29,1,'messi'),
(30,'M','Algeria','South Korea','','','2014-06-22 21:00:00','H',30,1,'feghouli'),
(31,'M','Portugal','United States','','','2014-06-22 23:59:59','G',31,1,'feghouli'),
(32,'M','Russia','Belgium','','','2014-06-22 18:00:00','H',32,1,'feghouli'),
(33,'M','Spain','Australia','','','2014-06-23 18:00:00','B',33,1,'ramos'),
(34,'M','Chile','Netherlands','','','2014-06-23 18:00:00','B',34,1,'ramos'),
(35,'M','Brazil','Cameroon','','','2014-06-23 22:00:00','A',35,1,'ramos'),
(36,'M','Mexico','Croatia','','','2014-06-23 22:00:00','A',36,1,'ramos'),
(37,'M','Uruguay','Italy','','','2014-06-24 18:00:00','D',37,1,'suarez'),
(38,'M','England','Costa Rica','','','2014-06-24 18:00:00','D',38,1,'suarez'),
(39,'M','Colombia','Japan','','','2014-06-24 22:00:00','C',39,1,'suarez'),
(40,'M','Ivory Coast','Greece','','','2014-06-24 22:00:00','C',40,1,'suarez'),
(41,'M','Argentina','Nigeria','','','2014-06-25 18:00:00','F',41,1,'benzema'),
(42,'M','Iran','Bosnia and Herzegovina','','','2014-06-25 18:00:00','F',42,1,'benzema'),
(43,'M','Switzerland','Honduras','','','2014-06-25 22:00:00','E',43,1,'benzema'),
(44,'M','France','Ecuador','','','2014-06-25 22:00:00','E',44,1,'benzema'),
(45,'M','Germany','United States','','','2014-06-26 18:00:00','G',45,1,'reus'),
(46,'M','Ghana','Portugal','','','2014-06-26 18:00:00','G',46,1,'reus'),
(47,'M','Belgium','South Korea','','','2014-06-26 22:00:00','H',47,1,'reus'),
(48,'M','Russia','Algeria','','','2014-06-26 22:00:00','H',48,1,'reus'),
(49,'M','1A','2B','','','2014-06-28 18:00:00','X',49,2,'armadillo_logo'),
(50,'M','1C','2D','','','2014-06-28 22:00:00','X',50,2,'armadillo_logo'),
(51,'M','1B','2A','','','2014-06-29 18:00:00','X',51,2,'armadillo_logo'),
(52,'M','1D','2C','','','2014-06-29 22:00:00','X',52,2,'armadillo_logo'),
(53,'M','1E','2F','','','2014-06-30 18:00:00','X',53,2,'armadillo_logo'),
(54,'M','1G','2H','','','2014-06-30 22:00:00','X',54,2,'armadillo_logo'),
(55,'M','1F','2E','','','2014-07-01 18:00:00','X',55,2,'armadillo_logo'),
(56,'M','1H','2G','','','2014-07-01 22:00:00','X',56,2,'armadillo_logo'),
(57,'M','Winner Match 53','Winner Match 54','','','2014-07-04 22:00:00','X',57,3,'armadillo_logo'),
(58,'M','Winner Match 49','Winner Match 50','','','2014-07-04 18:00:00','X',58,3,'armadillo_logo'),
(59,'M','Winner Match 51','Winner Match 52','','','2014-07-05 21:00:00','X',59,3,'armadillo_logo'),
(60,'M','Winner Match 55','Winner Match 56','','','2014-07-05 18:00:00','X',60,3,'armadillo_logo'),
(61,'M','Winner Match 59','Winner Match 60','','','2014-07-08 22:00:00','X',61,4,'armadillo_logo'),
(62,'M','Winner Match 57','Winner Match 58','','','2014-07-09 22:00:00','X',62,4,'armadillo_logo'),
(63,'M','Loser Match 61','Loser Match 62','','','2014-07-12 22:00:00','X',63,5,'sad'),
(64,'M','Winner Match 61','Winner Match 62','','','2014-07-13 21:00:00','X',64,6,'trophy');


----------
-- Create or alter vm2014_predictsingleteam

-----------------------------

-CREATE TABLE vm2014_predictsingleteam
(
  id text NOT NULL,
  predictedteam text,
  bet integer NOT NULL,
  points integer,
  scoretyp integer,
  scorehemma integer,
  CONSTRAINT preditsingle PRIMARY KEY (id, bet)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE vm2014_predictsingleteam
  OWNER TO gfwjbvprahvcbm;


----------
-- Create or alter vm2014_users

-----------------------------


CREATE TABLE vm2014_users
(
  id text NOT NULL,
  password text,
  name text,
  active integer,
  CONSTRAINT id_user PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE vm2014_users
  OWNER TO gfwjbvprahvcbm;


INSERT INTO vm2014_users(id, password, name, active) VALUES 
('perp','netlight-8017','Per',0),
('pepe','netlight-8018','Petter',0),
('caek','netlight-8001','Carl',0),
('suca','netlight-8002','Susanna',0),
('labr','netlight-8003','Lars',0),
('cuer','netlight-8004','Curt',0),
('jeje','netlight-8005','Jessica',0),
('chkr','netlight-8006','Sven',0),
('keja','netlight-8007','Kerstin',0),
('siin','netlight-8008','Ingalill',0),
('sese','netlight-8009','Seppo',0),
('anth','netlight-8010','Anders',0),
('ebol','netlight-8011','Ebba',0),
('maka','netlight-8012','Marita',0),
('guvi','netlight-8013','Gunnar',0),
('svpi','netlight-8014','Sven',0),
('anbe','netlight-8015','Ann-Louise',0),
('nini','netlight-8016','Nisse',0),
('alin','netlight-511','Alexander',0),
('vila','netlight-490','Victor',0),
('cale','netlight-128','Calle',0),
('maan','netlight-275','Martin',0),
('pire','netlight-322','Pierre',0),
('jipe','netlight-337','Jimmy',0),
('amni','netlight-309','Amanda',0),
('joen','netlight-109','Johan',0),
('plil','netlight-465','Per',0),
('sust','netlight-512','Susanne',0),
('inny','netlight-478','Ingela',0),
('loen','netlight-34','Louise',0),
('anoh','netlight-349','Anna',0),
('hala','netlight-259','Hanna',0),
('chja','netlight-454','Christian',0),
('mipa','netlight-134','Mikael',0),
('mawe','netlight-71','Martin',0),
('jobj','netlight-164','Johan',0),
('lero','netlight-206','Leopold',0),
('jm','netlight-1023','Joakim',0),
('pasa','netlight-487','Patrik',0),
('ataz','netlight-458','Atra',0),
('anfr','netlight-301','Anders',0),
('hata','netlight-285','Hakim',0),
('inga','netlight-130','Ingela',0),
('raye','netlight-394','Raymond',0),
('kran','netlight-194','Kristoffer',0),
('mafr','netlight-249','Mats',0),
('masj','netlight-103','Mattias',0),
('joac','netlight-428','Johan',0),
('joho','netlight-226','Johan',0),
('maom','netlight-383','Mattias',0),
('ivmi','netlight-420','Ivan',0),
('cape','netlight-367','Carl',0),
('mfre','netlight-462','Marcus',0),
('dalu','netlight-289','Daniel',0),
('beha','netlight-398','Behzad',0),
('eiju','netlight-85','Einar',0),
('maru','netlight-73','Martin',0),
('clfa','netlight-50','Claus',0),
('mahs','netlight-67','Martin',0),
('osed','netlight-30','Oskar',0),
('mala','netlight-77','Magnus',0),
('jahl','netlight-510','John-Oskar',0),
('anha','netlight-440','Anders',0),
('frlo','netlight-22','Fredrik',0),
('mape','netlight-36','Marius',0),
('krol','netlight-25','Kristina',0),
('jome','netlight-72','Jonathan',0),
('jore','netlight-474','Johanna',0),
('ll','netlight-2','Lars Olof',0),
('soek','netlight-151','Sofie',0),
('davo','netlight-307','Dario',0),
('peca','netlight-380','Per',0),
('joli','netlight-146','Jonas',0),
('pase','netlight-500','Paulo',0),
('caos','netlight-89','Cato',0),
('jono','netlight-265','Joakim',0),
('lido','netlight-48','Linus',0),
('kibr','netlight-37','Kim',0),
('ey','netlight-6','Erik',0),
('rala','netlight-65','Rafik',0),
('josi','netlight-272','Jonas',0),
('hwid','netlight-525','Henrik',0),
('anje','netlight-489','Anna',0),
('pala','netlight-316','Pascal',0),
('wiek','netlight-455','Wilhelm',0),
('phmo','netlight-522','Philip',0),
('mawm','netlight-69','Magnar',0),
('wiol','netlight-158','Wiveka',0),
('osfo','netlight-451','Oskar',0),
('frna','netlight-506','Frej',0),
('joel','netlight-9','Jonas',0),
('maha','netlight-166','Martin',0),
('kika','netlight-438','Kim',0),
('nian','netlight-336','Niclas',0),
('vipa','netlight-182','Viktor',0),
('anpo','netlight-402','Anton',0),
('frma','netlight-399','Frederik',0),
('anhe','netlight-20','Anders',0),
('peli','netlight-116','Peter',0),
('jiha','netlight-221','Jimmy',0),
('dams','netlight-64','Daniel',0),
('arja','netlight-60','Aram',0),
('ersk','netlight-47','Erik',0),
('osma','netlight-62','Oscar',0),
('chka','netlight-57','Christian',0),
('vima','netlight-68','Viktor',0),
('hebl','netlight-517','Henrik',0),
('jgh ','netlight-62','John',0),
('jobe','netlight-84','Johan',0),
('kasi','netlight-331','Karin',0),
('selu','netlight-408','Sebastian',0),
('egsa','netlight-426','Egle',0),
('guaz','netlight-513','Gustavo',0),
('alli','netlight-384','Allan',0),
('jasc','netlight-392','Jakob',0),
('frkn','netlight-352','Frida',0),
('pejo','netlight-312','Perry',0),
('maam','netlight-419','Markus',0),
('stju','netlight-286','Stefan',0),
('hesv','netlight-229','Henrik',0),
('bosj','netlight-95','Boel',0),
('lisk','netlight-434','Linn�a',0),
('mati','netlight-147','Marco',0),
('mafa','netlight-14','Mattias',0),
('anli','netlight-87','Anders',0),
('hjmo','netlight-276','Hjalmar',0),
('afre','netlight-494','Anna',0),
('pm','netlight-63','Petter',0),
('jost','netlight-112','Johan',0),
('alca','netlight-430','Albin',0),
('ho','netlight-74','Henrik',0),
('anru','netlight-509','Andreas',0),
('haan','netlight-473','H�kan',0),
('jenl','netlight-288','Jenny',0),
('mart','netlight-183','M�rten',0),
('daig','netlight-364','Daniel',0),
('chwa','netlight-370','Charlie',0),
('kaga','netlight-437','Karim',0),
('mber','netlight-496','Marcus',0),
('frji','netlight-261','Fredrik',0),
('nisk','netlight-212','Niklas',0),
('anba','netlight-356','Anders',0),
('mare','netlight-12','Marie',0),
('dawa','netlight-70','Daniel',0),
('heed','netlight-51','Henrik',0),
('shya','netlight-49','Shahbaz',0),
('krli','netlight-255','Kristofer',0),
('gere','netlight-79','Geoffrey',0),
('pepo','netlight-73','Peter',0),
('jera','netlight-68','Jennifer',0),
('peko','netlight-33','Peder',0),
('teja','netlight-519','Teodor',0),
('jody','netlight-52','Jostein',0),
('sesc','netlight-86','Sebastian',0),
('tolu','netlight-24','Tobias',0),
('anda','netlight-10','Annika',0),
('frll','netlight-75','Fredrik',0),
('joln','netlight-372','Joakim',0),
('mano','netlight-175','Malin',0),
('chwh','netlight-59','Christoffer',0),
('peny','netlight-501','Per',0),
('umkh','netlight-42','Ummear',0),
('movi','netlight-45','Morten',0),
('mhol','netlight-483','Martin',0),
('rubj','netlight-71','Rune',0),
('siha','netlight-298','Simon',0),
('lisu','netlight-296','Linus',0),
('heve','netlight-488','Henrik',0),
('henu','netlight-107','Heidi',0),
('kabs','netlight-91','Kaja',0),
('anad','netlight-401','Anton',0),
('anbe','netlight-388','Andreas',0),
('antr','netlight-66','Andreas',0),
('anbl','netlight-239','Andreas',0),
('gale','netlight-88','Gabriel',0),
('stha','netlight-80','Stian',0),
('liwi','netlight-148','Linn',0),
('many','netlight-110','Martin',0),
('jare','netlight-93','Jan',0),
('anpa','netlight-491','Andreas',0),
('osca','netlight-90','Oskar',0),
('oser','netlight-9','Oscar',0),
('anja','netlight-354','Andreas',0),
('chen','netlight-416','Christoffer',0),
('kaol','netlight-135','Karolina',0),
('mwil','netlight-411','Magnus',0),
('anth','netlight-177','Anders',0),
('tohe','netlight-382','Tobias',0),
('joja','netlight-397','Johanna',0),
('chmo','netlight-231','Christian',0),
('mali','netlight-213','Marc',0),
('joka','netlight-410','Jon',0),
('peso','netlight-303','Per',0),
('krsi','netlight-310','Kristofer',0),
('anbr','netlight-273','Andreas',0),
('daja','netlight-186','David',0),
('ulli','netlight-143','Ulf',0),
('agjo','netlight-523','Agnes',0),
('haca','netlight-315','Hans',0),
('johb','netlight-295','Johan',0),
('erol','netlight-222','Erik',0),
('elbr','netlight-400','Ellinor',0),
('sm','netlight-8','Staffan',0),
('bern','netlight-230','Marcus',0),
('joti','netlight-477','Johan',0),
('maja','netlight-263','Mattias',0),
('lalu','netlight-341','Lars-Erik',0),
('siau','netlight-345','Simon',0),
('anwi','netlight-359','Andreas',0),
('frsc','netlight-282','Fredrik',0),
('fjoh','netlight-463','Fredrik',0),
('keau','netlight-393','Keith',0),
('leed','netlight-493','Lena',0),
('jh','netlight-3','Jonas',0),
('mawi','netlight-87','Magnus',0),
('oseu','netlight-415','Oskar',0),
('seno','netlight-308','Set',0),
('vias','netlight-495','Viktor',0),
('liha','netlight-101','Lina',0),
('ange','netlight-270','Andreas',0),
('dsan','netlight-449','David',0),
('marc','netlight-105','Marcus',0),
('anwo','netlight-141','Anneli',0),
('jowi','netlight-102','Johan',0),
('jary','netlight-518','Jakob',0),
('hs','netlight-4','Henrik',0),
('evso','netlight-254','Eva',0),
('nima','netlight-83','Nina',0),
('anso','netlight-293','Anders',0),
('dabo','netlight-233','David',0),
('elku','netlight-479','Elis',0),
('krre','netlight-357','Kristoffer',0),
('hhan','netlight-279','Henrik',0),
('daqv','netlight-369','Daniel',0),
('chos','netlight-351','Christofer',0),
('holo','netlight-390','Hong',0),
('joon','netlight-329','Johan',0),
('cagu','netlight-456','Carolina',0),
('frel','netlight-240','Fredrik',0),
('lola','netlight-198','Loutfi',0),
('sefa','netlight-16','Sebastian',0),
('anpe','netlight-302','Andreas',0),
('carb','netlight-405','Caroline',0),
('migo','netlight-413','Mirko',0),
('anka','netlight-124','Anders',0),
('er','netlight-10','Erik',0),
('erno','netlight-391','Erik',0),
('joah','netlight-485','Jonas',0),
('jose','netlight-145','Johan',0),
('peni','netlight-520','Peter',0),
('me','netlight-67','Mandus',0),
('jolu','netlight-227','Johanna',0),
('ulda','netlight-497','Ulf',0),
('chan','netlight-11','Christian',0),
('chge','netlight-16','Christoph',0),
('fesp','netlight-2','Felix',0),
('dama','netlight-18','Daniel',0),
('motr','netlight-4','Moritz',0),
('inho','netlight-19','Martin',0),
('mier','netlight-5','Michael',0),
('alan','netlight-10','Alvin',0),
('mabo','netlight-12','Maximilian',0),
('joby','netlight-3','Johan',0),
('erlu','netlight-291','Erik',0),
('lari','netlight-260','Lars',0),
('mhav','netlight-97','Martin',0),
('frso','netlight-98','Fredrik',0),
('maeg','netlight-94','Marcel',0),
('ankv','netlight-95','Anna',0),
('mkon','netlight-492','Gnagna Marianne',0),
('last','netlight-96','Lars',0),
('sytu','netlight-545','Syrgak',0),
('mand','netlight-526','Mathias',0),
('jalf','netlight-527','Jonas',0),
('casy','netlight-528','Carl-Johan',0),
('jand','netlight-529','Johan',0),
('mien','netlight-531','Michael',0),
('psan','netlight-532','Pablo',0),
('thbo','netlight-534','Thor',0),
('wizh','netlight-535','William',0),
('clmu','netlight-536','Claes',0),
('fand','netlight-537','Filip',0),
('frfi','netlight-539','Fredrik',0),
('joni','netlight-540','Johannes',0),
('teli','netlight-543','Teodor',0),
('anan','netlight-544','Andreas',0),
('gedi','netlight-546','Georgios',0),
('elde','netlight-547','Elina',0),
('djhe','netlight-17','Djavad',0),
('esny','netlight-99','Espen',0),
('jabl','netlight-21','James',0),
('viro','netlight-548','Victor',0),
('soab','netlight-549','Sofie',0),
('frhu','netlight-555','Fredrik',0),
('vape','netlight-556','Val�rie',0),
('joma','netlight-557','Johan',0),
('krwa','netlight-102','Kristian',0),
('gipa','netlight-22','Gianni',0),
('dasc','netlight-20','Daniel',0),
('anek','netlight-149','Andreas',0),
('jjam','netlight-582','Joakim',0),
('johe','netlight-594','Johan',0),
('jnys','netlight-112','Joel',0),
('oyto','netlight-113','�ystein',0),
('nila','netlight-284','Nil',0),
('dabj','netlight-115','David',0),
('cdah','netlight-610','Christian',0),
('trsh','netlight-611','Truls',0),
('annh','netlight-612','Anna',0),
('adme','netlight-613','Adam',0),
('jpet','netlight-587','Jonas',0),
('maak','netlight-110','Marcus',0),
('sara','netlight-111','Sara',0),
('asde','netlight-588','Astrid',0),
('joej','netlight-589','Joakim',0),
('jahe','netlight-591','Jacob',0),
('dagu','netlight-592','Daniel',0),
('maku','netlight-595','Maria',0),
('erhe','netlight-598','Erik',0),
('jobl','netlight-101','Johan',0),
('osot','netlight-100','Oskar',0),
('alge','netlight-559','Alexander',0),
('lich','netlight-561','Linda',0),
('ersj','netlight-23','Erik',0),
('fihi','netlight-24','Filip',0),
('arsy','netlight-253','Ardian',0),
('anhv','netlight-103','Andrea',0),
('daan','netlight-564','Daniel',0),
('mlin','netlight-562','Mikael',0),
('jokm','netlight-104','Johannes',0),
('stko','netlight-292','Stefan',0),
('madf','netlight-605','Madelen',0),
('dawe','netlight-616','Daniel',0),
('marw','netlight-35','Marcus',0),
('vipi','netlight-617','Viktor',0),
('lwia','netlight-36','Linda',0),
('powa','netlight-618','Pontus',0),
('alst','netlight-37','Alexander',0),
('anzo','netlight-619','Anahita',0),
('roka','netlight-620','Robin',0),
('magi','netlight-117','Magnus',0),
('crso','netlight-118','Cristoffer',0),
('baki','netlight-39','Bastian',0),
('josm','netlight-628','Joel',0),
('elan','netlight-629','Ellen',0),
('mjah','netlight-123','Mads',0),
('stel','netlight-635','Stefan',0),
('sava','netlight-636','Sandra',0),
('meri','netlight-119','Magnus',0),
('paej','netlight-625','Patric',0),
('anop','netlight-38','Ana',0),
('akad','netlight-626','Ann-Kristin',0),
('liri','netlight-627','Lisa',0),
('cabj','netlight-621','Carl',0),
('alne','netlight-622','Alexander',0),
('madu','netlight-623','Martin',0),
('thsj','netlight-624','Theodor',0),
('jemo','netlight-121','Jens',0),
('mama','netlight-40','Max',0),
('bjro','netlight-122','Bj�rn',0),
('saso','netlight-633','Sabina',0),
('tiwe','netlight-634','Tina',0),
('steh','netlight-42','Stefan',0),
('stbe','netlight-43','Steve',0),
('neor','netlight-44','Nevzat',0),
('chfo','netlight-45','Christian',0),
('krno','netlight-46','Kristin',0),
('anro','netlight-1','Anna',0),
('wizu','netlight-637','Wilian',0),
('axha','netlight-639','Axel',0),
('sini','netlight-640','Simon',0),
('chol','netlight-641','Christian',0),
('mifi','netlight-642','Mirjam',0),
('samh','netlight-643','Samira',0),
('anlo','netlight-48','Andreas',0),
('jesa','netlight-47','Jesper',0),
('seru','netlight-49','Sebastian',0),
('seme','netlight-50','Sebastian',0),
('erfo','netlight-644','Erika',0),
('linh','netlight-638','Lina',0),
('ersu','netlight-41','Erdisa',0),
('daka','netlight-124','David',0),
('djos','netlight-125','Daniel',0),
('guda','netlight-126','Gustaf',0),
('mask','netlight-127','Magnus',0),
('haju','netlight-2','Hannes',0),
('alta','netlight-645','Alexander',0),
('nias','netlight-472','Niklas',0),
('chak','netlight-648','Charlotte',0),
('irgo','netlight-105','Irina',0),
('mafo','netlight-106','Martin',0),
('annt','netlight-567','Annie',0),
('chni','netlight-568','Christina',0),
('chei','netlight-26','Christoph',0),
('soka','netlight-28','Sophia',0),
('jofe','netlight-29','Manuel',0),
('anki','netlight-30','Andreas',0),
('muis','netlight-31','Mustafa',0),
('moku','netlight-25','Moritz',0),
('anri','netlight-27','Anders',0),
('egus','netlight-569','Ellen',0),
('jaol','netlight-33','Jan',0),
('hewi','netlight-283','Henric',0),
('saho','netlight-107','Sara',0),
('miam','netlight-646','Michel',0),
('seam','netlight-647','Sepehr',0),
('robk','netlight-651','Robin',0),
('anun','netlight-129','Anlaug',0),
('hese','netlight-131','Hege Beate',0),
('micl','netlight-657','Mia',0),
('host','netlight-658','Holger',0),
('adfi','netlight-659','Adam',0),
('nile','netlight-660','Nick',0),
('dlun','netlight-694','Daniel',0),
('miva','netlight-5','Miikka',0),
('stkr','netlight-147','Stian',0),
('saam','netlight-712','Sara',0),
('osth','netlight-717','Oskar',0),
('jewa','netlight-718','Jesper',0),
('than','netlight-172','Thomas',0),
('jali','netlight-108','Jarle',0),
('nilu','netlight-580','Nicklas',0),
('jona','netlight-32','Jon',0),
('anga','netlight-573','Andreas',0),
('capr','netlight-34','Carmen',0),
('krho','netlight-574','Kristoffer',0),
('vija','netlight-109','Victor',0),
('jjan','netlight-577','Jonatan',0),
('fros','netlight-579','Frida',0),
('paog','netlight-586','Patric',0),
('jefr','netlight-599','Jesper',0),
('sube','netlight-601','Susanne',0),
('json','netlight-602','Jonathan',0),
('meke','netlight-603','Mehdi',0),
('chob','netlight-604','Christoffer',0),
('jojo','netlight-114','Joel',0),
('emli','netlight-606','Emma',0),
('joak','netlight-608','Joakim',0),
('robo','netlight-649','Robert',0),
('jhal','netlight-650','Johan',0),
('tikr','netlight-54','Till',0),
('slaz','netlight-128','Sofien',0),
('sodo','netlight-56','Sophia',0),
('vika','netlight-130','Viktor',0),
('peek','netlight-55','Petter',0),
('joep','netlight-653','Joel',0),
('frbe','netlight-654','Freddie',0),
('kain','netlight-655','Katarina',0),
('fiho','netlight-664','Filip',0),
('mini','netlight-665','Mikael',0),
('emhe','netlight-666','Emelie',0),
('jtil','netlight-667','Jonna',0),
('mase','netlight-57','Marco',0),
('mlil','netlight-58','Manuel',0),
('rost','netlight-668','Roger',0),
('eren','netlight-132','Erik',0),
('daak','netlight-661','Daniel',0),
('olho','netlight-662','Olof',0),
('chly','netlight-133','Christian',0),
('wiki','netlight-134','William',0),
('chwi','netlight-135','Charlotte',0),
('sewe','netlight-672','Sebastian',0),
('sage','netlight-59','Sabrina',0),
('evth','netlight-673','Evelina',0),
('isar','netlight-681','Isabella',0),
('kama','netlight-682','Karim',0),
('frde','netlight-683','Fredrik',0),
('caek','netlight-684','Carl',0),
('mach','netlight-343','Max',0),
('fier','netlight-670','Filip',0),
('kahe','netlight-671','Karin',0),
('jehu','netlight-60','Jennifer',0),
('axsa','netlight-674','Axel',0),
('ppou','netlight-675','Pejhman',0),
('hakh','netlight-676','Haval',0),
('agso','netlight-136','Agnethe',0),
('mazi','netlight-61','Markus',0),
('lifl','netlight-679','Linus',0),
('wisk','netlight-677','William',0),
('mied','netlight-678','Mikael',0),
('arke','netlight-692','Artur',0),
('olki','netlight-693','Olof',0),
('mabr','netlight-143','Martin',0),
('adhe','netlight-66','Adalie',0),
('milu','netlight-67','Michael',0),
('mari','netlight-695','Magdalena',0),
('amjw','netlight-696','Amer',0),
('deri','netlight-680','David',0),
('jjoh','netlight-138','John',0),
('jmar','netlight-685','Jonas',0),
('msan','netlight-140','Mari',0),
('erlo','netlight-141','Erica',0),
('perg','netlight-214','Peter',0),
('guyd','netlight-690','Gustav',0),
('fima','netlight-691','Filip',0),
('oywe','netlight-139','�yvind',0),
('omkh','netlight-686','Omar',0),
('jlil','netlight-687','Jonatan',0),
('jago','netlight-142','Jannik',0),
('saga','netlight-62','Saksham',0),
('habi','netlight-689','Hanna',0),
('thkr','netlight-63','Thomas',0),
('jhos','netlight-64','Johan',0),
('mast','netlight-739','Marie',0),
('stli','netlight-76','Stefan',0),
('mhan','netlight-65','Marlon Jonathan',0),
('ammo','netlight-697','Amanda',0),
('algo','netlight-698','Alexander',0),
('neka','netlight-699','Nesrin',0),
('magr','netlight-145','Maria',0),
('axno','netlight-703','Axel',0),
('erbo','netlight-704','Erik',0),
('juhy','netlight-4','Juha',0),
('mbau','netlight-69','Merlin',0),
('liso','netlight-70','Lisa',0),
('aral','netlight-144','Arild',0),
('mhog','netlight-700','Matts',0),
('hoqu','netlight-68','Hong-Khoan',0),
('zeno','netlight-701','Zenita',0),
('mesu','netlight-702','Meng',0),
('vida','netlight-146','Victor',0),
('mlun','netlight-705','Mattias',0),
('mafe','netlight-706','Markus',0),
('oand','netlight-707','Oskar',0),
('jaan','netlight-148','Jacob',0),
('luta','netlight-709','Lucas',0),
('cnil','netlight-710','Christoffer',0),
('maro','netlight-711','Max',0),
('zisa','netlight-149','Zia',0),
('joje','netlight-719','Johanna',0),
('pabi','netlight-720','Patrik',0),
('jovo','netlight-725','Johanna',0),
('erte','netlight-150','Erik',0),
('waka','netlight-72','Walter',0),
('maju','netlight-726','Marco',0),
('chha','netlight-152','Christina',0),
('lila','netlight-727','Liva',0),
('rige','netlight-708','Rikard',0),
('joda','netlight-713','Jonny',0),
('chwe','netlight-714','Christian',0),
('guah','netlight-716','Gustav',0),
('mial','netlight-721','Miran',0),
('kaha','netlight-722','Kajsa',0),
('mfor','netlight-723','Martin',0),
('rust','netlight-151','Rune',0),
('osin','netlight-73','Oskar',0),
('mjoh','netlight-153','Marcus',0),
('erho','netlight-730','Erik',0),
('sace','netlight-731','Sanna',0),
('niun','netlight-715','Niclas',0),
('jtra','netlight-71','Johanna',0),
('asso','netlight-724','�sa',0),
('rian','netlight-732','Rikard',0),
('thno','netlight-733','Thomas',0),
('anna','netlight-734','Anton',0),
('ghpu','netlight-74','Gheorghe',0),
('geha','netlight-728','Geries',0),
('nipe','netlight-737','Niklas',0),
('jabe','netlight-738','Jacob',0),
('osud','netlight-75','Oskar',0),
('anbj','netlight-735','Andreas',0),
('krer','netlight-736','Kristina',0),
('olak','netlight-154','Ole-Magnus',0),
('erig','netlight-740','Erik',0),
('anve','netlight-741','Anna-Karin',0),
('pepa','netlight-743','Petri',0),
('mamo','netlight-744','Malte',0);


----
--- administer teams advancing

-----
DROP TABLE IF EXISTS vm2014_teamadvancing;
CREATE TABLE vm2014_teamadvancing
(
  id integer NOT NULL,
  "group" text,
  match integer,
  team text,
  "position" integer,
  phase integer,
  advancing text,
  CONSTRAINT id_team_winners PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE vm2014_teamadvancing
  OWNER TO gfwjbvprahvcbm;
  
----
--- all matches with teams advancing
-----
  
INSERT INTO vm2014_teamadvancing (id,group,match,team,position,phase,advancing) VALUES
(1,'A',49,'',1,2,''),
(2,'A',51,'',2,2,''),
(3,'B',51,'',1,2,''),
(4,'B',49,'',2,2,''),
(5,'C',50,'',1,2,''),
(6,'C',52,'',2,2,''),
(7,'D',52,'',1,2,''),
(8,'D',50,'',2,2,''),
(9,'E',53,'',1,2,''),
(10,'E',55,'',2,2,''),
(11,'F',55,'',1,2,''),
(12,'F',53,'',2,2,''),
(13,'G',54,'',1,2,''),
(14,'G',56,'',2,2,''),
(15,'H',56,'',1,2,''),
(16,'H',54,'',2,2,''),
(17,'Quarter',57,'53',1,3,''),
(18,'Quarter',57,'54',2,3,''),
(19,'Quarter',58,'49',1,3,''),
(20,'Quarter',58,'50',2,3,''),
(21,'Quarter',59,'51',1,3,''),
(22,'Quarter',59,'52',2,3,''),
(23,'Quarter',60,'55',1,3,''),
(24,'Quarter',60,'56',2,3,''),
(25,'Semis',62,'57',1,4,''),
(26,'Semis',62,'58',2,4,''),
(27,'Semis',61,'59',1,4,''),
(28,'Semis',61,'60',2,4,''),
(29,'Third',63,'61',1,5,''),
(30,'Third',63,'62',2,5,''),
(31,'Final',64,'61',1,6,''),
(32,'Final',64,'62',2,6,'')


---------------------------- MINI TOURNAMENT SUPPORT ---------------------------- 


--
-- The 'vm2014_match' table
--

DROP TABLE IF EXISTS vm2014_match;
CREATE TABLE IF NOT EXISTS vm2014_match (
  id integer NOT NULL,
  borta text,
  typ text,
  hemma text,
  beskrivning text,
  resultat text,
  datum timestamp without time zone,
  grupp text,
  bet integer,
  phase integer,
  image text,
  CONSTRAINT id_match PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
); ALTER TABLE vm2014_match
  OWNER TO gfwjbvprahvcbm;


--
-- All test matches for the world cup
--

INSERT INTO vm2014_match (id, borta, typ, hemma, beskrivning, resultat, datum, grupp, bet, phase, image) VALUES
(1,'M','Croatia','Brazil','','','2014-06-09 13:00:00','X',1,3,'neymar0'),
(2,'M','Cameroon','Mexico','','','2014-06-09 13:00:00','X',2,3,'etoo'),
(3,'M','Netherlands','Spain','','','2014-06-09 18:00:00','X',3,3,'robben'),
(4,'M','Argentina','Australia','','','2014-06-09 18:00:00','X',4,3,'messi'),
(5,'M','Winner match 1','Winner match 2','','','2014-06-10 14:00:00','X',5,4,'armadillo_logo'),
(6,'M','Winner match 3','Winner match 4','','','2014-06-10 14:00:00','X',6,4,'armadillo_logo'),
(7,'M','Loser Match 5','Loser Match 6','','','2014-06-10 20:00:00','X',7,5,'sad'),
(8,'M','Winner Match 5','Winner Match 6','','','2014-06-10 22:00:00','X',8,6,'trophy');

----
--- administer teams advancing

-----
DROP TABLE IF EXISTS vm2014_teamadvancing;
CREATE TABLE vm2014_teamadvancing
(
  id integer NOT NULL,
  "group" text,
  match integer,
  team text,
  "position" integer,
  phase integer,
  advancing text,
  CONSTRAINT id_team_winners PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE vm2014_teamadvancing
  OWNER TO gfwjbvprahvcbm;

----
--- all matches with teams advancing
-----

INSERT INTO vm2014_teamadvancing (id,group,match,team,position,phase,advancing) VALUES
(1,'Semis',5,'1',1,4,''),
(2,'Semis',5,'2',2,4,''),
(3,'Semis',6,'3',1,4,''),
(4,'Semis',6,'4',2,4,''),
(5,'Third',7,'5',1,5,''),
(6,'Third',7,'6',2,5,''),
(7,'Final',8,'5',1,6,''),
(8,'Final',8,'6',2,6,'')


----------
-- Create or alter vm2014_predictsingleteam

-----------------------------

-CREATE TABLE vm2014_predictsingleteam
(
  id text NOT NULL,
  predictedteam text,
  bet integer NOT NULL,
  points integer,
  scoretyp integer,
  scorehemma integer,
  CONSTRAINT preditsingle PRIMARY KEY (id, bet)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE vm2014_predictsingleteam
  OWNER TO gfwjbvprahvcbm;


----------
-- Create or alter vm2014_users

-----------------------------


CREATE TABLE vm2014_users
(
  id text NOT NULL,
  password text,
  name text,
  active integer,
  CONSTRAINT id_user PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE vm2014_users
  OWNER TO gfwjbvprahvcbm;


INSERT INTO vm2014_users(id, password, name, active) VALUES 
('mkon','netlight-111','Gnagna',0),
('amjw','netlight-112','Amer',0),
('algo','netlight-113','Alexander',0),
('sgardet@gmail.com','simon','Simon',0);


----------------------------------

--
-- Database: 'vm2014'
--

-- --------------------------------------------------------
-- --------------------------------------------------------

--
-- The 'wm2014_match' table
--

DROP TABLE IF EXISTS vm2014_match;
CREATE TABLE IF NOT EXISTS vm2014_match (
  id integer NOT NULL,
  borta text,
  typ text,
  hemma text,
  beskrivning text,
  resultat text,
  datum timestamp without time zone,
  grupp text,
  bet integer,
  phase integer,
  image text,
  CONSTRAINT id_match PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
); ALTER TABLE vm2014_match
  OWNER TO gfwjbvprahvcbm;


--
-- All matches for the world cup
--

INSERT INTO vm2014_match (id, borta, typ, hemma, beskrivning, resultat, datum, grupp, bet, phase, image) VALUES
(1,'M','Croatia','Brazil','','','2014-06-12 22:00:00','A',1,1,'neymar0'),
(2,'M','Cameroon','Mexico','','','2014-06-13 18:00:00','A',2,1,'etoo'),
(3,'M','Netherlands','Spain','','','2014-06-13 21:00:00','B',3,1,'etoo'),
(4,'M','Australia','Chile','','','2014-06-13 23:59:59','B',4,1,'etoo'),
(5,'M','Greece','Colombia','','','2014-06-14 18:00:00','C',5,1,'james'),
(6,'M','Costa Rica','Uruguay','','','2014-06-14 21:00:00','D',6,1,'james'),
(7,'M','Japan','Ivory Coast','','','2014-06-15 03:00:00','C',7,1,'dd'),
(8,'M','Italy','England','','','2014-06-14 23:59:59','D',8,1,'james'), 
(9,'M','Ecuador','Switzerland','','2:3','2014-06-15 18:00:00','E',9,1,'dd'),
(10,'M','Honduras','France','','','2014-06-15 21:00:00','E',10,1,'dd'),
(11,'M','Bosnia and Herzegovina','Argentina','','','2014-06-15 23:59:59','F',11,1,'dd'),
(12,'M','Portugal','Germany','','','2014-06-16 18:00:00','G',12,1,'ronaldo'),
(13,'M','Nigeria','Iran','','','2014-06-16 21:00:00','F',13,1,'ronaldo'),
(14,'M','United States','Ghana','','','2014-06-16 23:59:59','G',14,1,'ronaldo'),
(15,'M','Algeria','Belgium','','','2014-06-17 18:00:00','H',15,1,'hazard'),
(16,'M','Mexico','Brazil','','','2014-06-17 21:00:00','A',16,1,'hazard'),
(17,'M','South Korea','Russia','','','2014-06-17 23:59:59','H',17,1,'hazard'),
(18,'M','Netherlands','Australia','','','2014-06-18 18:00:00','B',18,1,'robben'),
(19,'M','Croatia','Cameroon','','','2014-06-18 23:59:59','A',19,1,'robben'),
(20,'M','Chile','Spain','','','2014-06-18 21:00:00','B',20,1,'robben'),
(21,'M','Ivory Coast','Colombia','','','2014-06-19 18:00:00','C',21,1,'yaya'),
(22,'M','England','Uruguay','','','2014-06-19 21:00:00','D',22,1,'yaya'),
(23,'M','Greece','Japan','','','2014-06-19 23:59:59','C',23,1,'yaya'),
(24,'M','Costa Rica','Italy','','','2014-06-20 18:00:00','D',24,1,'balotelli'),
(25,'M','France','Switzerland','','','2014-06-20 21:00:00','E',25,1,'balotelli'),
(26,'M','Ecuador','Honduras','','','2014-06-20 23:59:59','E',26,1,'balotelli'),
(27,'M','Iran','Argentina','','','2014-06-21 18:00:00','F',27,1,'messi'),
(28,'M','Ghana','Germany','','','2014-06-21 21:00:00','G',28,1,'messi'),
(29,'M','Bosnia and Herzegovina','Nigeria','','','2014-06-21 23:59:59','F',29,1,'messi'),
(30,'M','Algeria','South Korea','','','2014-06-22 21:00:00','H',30,1,'feghouli'),
(31,'M','Portugal','United States','','','2014-06-22 23:59:59','G',31,1,'feghouli'),
(32,'M','Russia','Belgium','','','2014-06-22 18:00:00','H',32,1,'feghouli'),
(33,'M','Spain','Australia','','','2014-06-23 18:00:00','B',33,1,'ramos'),
(34,'M','Chile','Netherlands','','','2014-06-23 18:00:00','B',34,1,'ramos'),
(35,'M','Brazil','Cameroon','','','2014-06-23 22:00:00','A',35,1,'ramos'),
(36,'M','Mexico','Croatia','','','2014-06-23 22:00:00','A',36,1,'ramos'),
(37,'M','Uruguay','Italy','','','2014-06-24 18:00:00','D',37,1,'suarez'),
(38,'M','England','Costa Rica','','','2014-06-24 18:00:00','D',38,1,'suarez'),
(39,'M','Colombia','Japan','','','2014-06-24 22:00:00','C',39,1,'suarez'),
(40,'M','Ivory Coast','Greece','','','2014-06-24 22:00:00','C',40,1,'suarez'),
(41,'M','Argentina','Nigeria','','','2014-06-25 18:00:00','F',41,1,'benzema'),
(42,'M','Iran','Bosnia and Herzegovina','','','2014-06-25 18:00:00','F',42,1,'benzema'),
(43,'M','Switzerland','Honduras','','','2014-06-25 22:00:00','E',43,1,'benzema'),
(44,'M','France','Ecuador','','','2014-06-25 22:00:00','E',44,1,'benzema'),
(45,'M','Germany','United States','','','2014-06-26 18:00:00','G',45,1,'reus'),
(46,'M','Ghana','Portugal','','','2014-06-26 18:00:00','G',46,1,'reus'),
(47,'M','Belgium','South Korea','','','2014-06-26 22:00:00','H',47,1,'reus'),
(48,'M','Russia','Algeria','','','2014-06-26 22:00:00','H',48,1,'reus'),
(49,'M','1A','2B','','','2014-06-28 18:00:00','X',49,2,'armadillo_logo'),
(50,'M','1C','2D','','','2014-06-28 22:00:00','X',50,2,'armadillo_logo'),
(51,'M','1B','2A','','','2014-06-29 18:00:00','X',51,2,'armadillo_logo'),
(52,'M','1D','2C','','','2014-06-29 22:00:00','X',52,2,'armadillo_logo'),
(53,'M','1E','2F','','','2014-06-30 18:00:00','X',53,2,'armadillo_logo'),
(54,'M','1G','2H','','','2014-06-30 22:00:00','X',54,2,'armadillo_logo'),
(55,'M','1F','2E','','','2014-07-01 18:00:00','X',55,2,'armadillo_logo'),
(56,'M','1H','2G','','','2014-07-01 22:00:00','X',56,2,'armadillo_logo'),
(57,'M','Winner Match 53','Winner Match 54','','','2014-07-04 22:00:00','X',57,3,'armadillo_logo'),
(58,'M','Winner Match 49','Winner Match 50','','','2014-07-04 18:00:00','X',58,3,'armadillo_logo'),
(59,'M','Winner Match 51','Winner Match 52','','','2014-07-05 21:00:00','X',59,3,'armadillo_logo'),
(60,'M','Winner Match 55','Winner Match 56','','','2014-07-05 18:00:00','X',60,3,'armadillo_logo'),
(61,'M','Winner Match 59','Winner Match 60','','','2014-07-08 22:00:00','X',61,4,'armadillo_logo'),
(62,'M','Winner Match 57','Winner Match 58','','','2014-07-09 22:00:00','X',62,4,'armadillo_logo'),
(63,'M','Loser Match 61','Loser Match 62','','','2014-07-12 22:00:00','X',63,5,'sad'),
(64,'M','Winner Match 61','Winner Match 62','','','2014-07-13 21:00:00','X',64,6,'trophy');


----------
-- Create or alter vm2014_predictsingleteam

-----------------------------

CREATE TABLE vm2014_predictsingleteam
(
  id text NOT NULL,
  predictedteam text,
  bet integer NOT NULL,
  points integer,
  scoretyp integer,
  scorehemma integer,
  CONSTRAINT preditsingle PRIMARY KEY (id, bet)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE vm2014_predictsingleteam
  OWNER TO gfwjbvprahvcbm;


----------
-- Create or alter vm2014_users

-----------------------------


CREATE TABLE vm2014_users
(
  id text NOT NULL,
  password text,
  name text,
  active integer,
  CONSTRAINT id_user PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE vm2014_users
  OWNER TO gfwjbvprahvcbm;


INSERT INTO vm2014_users(id, password, name, active) VALUES
('gna','gna','Ronaldah',0),
('era','era','Michel Platinum ',0),
('blake','blake','Calvinho',0);


----
--- administer teams advancing

-----
DROP TABLE IF EXISTS vm2014_teamadvancing;
CREATE TABLE vm2014_teamadvancing
(
  id integer NOT NULL,
  groupo text,
  matcho integer,
  team text,
  positiono integer,
  phase integer,
  advancing text,
  CONSTRAINT id_team_winners PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE vm2014_teamadvancing
  OWNER TO gfwjbvprahvcbm;
  
----
--- all matches with teams advancing
-----
  
INSERT INTO vm2014_teamadvancing (id,groupo,matcho,team,positiono,phase,advancing) VALUES
(1,'A',49,'',1,2,''),
(2,'A',51,'',2,2,''),
(3,'B',51,'',1,2,''),
(4,'B',49,'',2,2,''),
(5,'C',50,'',1,2,''),
(6,'C',52,'',2,2,''),
(7,'D',52,'',1,2,''),
(8,'D',50,'',2,2,''),
(9,'E',53,'',1,2,''),
(10,'E',55,'',2,2,''),
(11,'F',55,'',1,2,''),
(12,'F',53,'',2,2,''),
(13,'G',54,'',1,2,''),
(14,'G',56,'',2,2,''),
(15,'H',56,'',1,2,''),
(16,'H',54,'',2,2,''),
(17,'Quarter',57,'53',1,3,''),
(18,'Quarter',57,'54',2,3,''),
(19,'Quarter',58,'49',1,3,''),
(20,'Quarter',58,'50',2,3,''),
(21,'Quarter',59,'51',1,3,''),
(22,'Quarter',59,'52',2,3,''),
(23,'Quarter',60,'55',1,3,''),
(24,'Quarter',60,'56',2,3,''),
(25,'Semis',62,'57',1,4,''),
(26,'Semis',62,'58',2,4,''),
(27,'Semis',61,'59',1,4,''),
(28,'Semis',61,'60',2,4,''),
(29,'Third',63,'61',1,5,''),
(30,'Third',63,'62',2,5,''),
(31,'Final',64,'61',1,6,''),
(32,'Final',64,'62',2,6,'');


---------------------------- MINI TOURNAMENT SUPPORT ---------------------------- 


--
-- The 'vm2014_match' table
--

DROP TABLE IF EXISTS vm2014_match;
CREATE TABLE IF NOT EXISTS vm2014_match (
  id integer NOT NULL,
  borta text,
  typ text,
  hemma text,
  beskrivning text,
  resultat text,
  datum timestamp without time zone,
  grupp text,
  bet integer,
  phase integer,
  image text,
  CONSTRAINT id_match PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
); ALTER TABLE vm2014_match
  OWNER TO gfwjbvprahvcbm;


--
-- All test matches for the world cup
--

INSERT INTO vm2014_match (id, borta, typ, hemma, beskrivning, resultat, datum, grupp, bet, phase, image) VALUES
(1,'M','Croatia','Brazil','','','2014-06-09 13:00:00','X',1,3,'neymar0'),
(2,'M','Cameroon','Mexico','','','2014-06-09 13:00:00','X',2,3,'etoo'),
(3,'M','Netherlands','Spain','','','2014-06-09 18:00:00','X',3,3,'robben'),
(4,'M','Argentina','Australia','','','2014-06-09 18:00:00','X',4,3,'messi'),
(5,'M','Winner match 1','Winner match 2','','','2014-06-10 14:00:00','X',5,4,'armadillo_logo'),
(6,'M','Winner match 3','Winner match 4','','','2014-06-10 14:00:00','X',6,4,'armadillo_logo'),
(7,'M','Loser Match 5','Loser Match 6','','','2014-06-10 20:00:00','X',7,5,'sad'),
(8,'M','Winner Match 5','Winner Match 6','','','2014-06-10 22:00:00','X',8,6,'trophy');

----
--- administer teams advancing

-----
DROP TABLE IF EXISTS vm2014_teamadvancing;
CREATE TABLE vm2014_teamadvancing
(
  id integer NOT NULL,
  groupo text,
  matcho integer,
  team text,
  positiono integer,
  phase integer,
  advancing text,
  CONSTRAINT id_team_winners PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE vm2014_teamadvancing
  OWNER TO gfwjbvprahvcbm;

----
--- all matches with teams advancing
-----

INSERT INTO vm2014_teamadvancing (id,groupo,matcho,team,positiono,phase,advancing) VALUES
(1,'Semis',5,'1',1,4,''),
(2,'Semis',5,'2',2,4,''),
(3,'Semis',6,'3',1,4,''),
(4,'Semis',6,'4',2,4,''),
(5,'Third',7,'5',1,5,''),
(6,'Third',7,'6',2,5,''),
(7,'Final',8,'5',1,6,''),
(8,'Final',8,'6',2,6,'');


----------
-- Create or alter vm2014_predictsingleteam

-----------------------------

CREATE TABLE vm2014_predictsingleteam
(
  id text NOT NULL,
  predictedteam text,
  bet integer NOT NULL,
  points integer,
  scoretyp integer,
  scorehemma integer,
  CONSTRAINT preditsingle PRIMARY KEY (id, bet)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE vm2014_predictsingleteam
  OWNER TO gfwjbvprahvcbm;


----------
-- Create or alter vm2014_users

-----------------------------


CREATE TABLE vm2014_users
(
  id text NOT NULL,
  password text,
  name text,
  active integer,
  CONSTRAINT id_usero PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE vm2014_users
  OWNER TO gfwjbvprahvcbm;


INSERT INTO vm2014_users(id, password, name, active) VALUES 
('gna','gna','Ronaldah',0),
('blake','blake','Calvinho',0),
('eran','eran','Michel Platinum',0);