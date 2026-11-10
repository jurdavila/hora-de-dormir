// Histórias bíblicas recontadas para crianças (textos originais, baseados na Bíblia)
const STORIES = [
{t:"Deus cria o mundo", ref:"Gênesis 1", e:"🌍",
txt:`No começo, não existia nada. Nem céu, nem mar, nem árvore, nem passarinho. Só Deus existia. E Deus, que é muito criativo, disse: "Haja luz!" E a luz apareceu, brilhante e bonita.
Depois Deus fez o céu azul e separou as águas. Fez a terra seca, com montanhas e campos, e encheu tudo de flores, árvores e frutas gostosas.
Deus colocou o sol para brilhar de dia e a lua e as estrelas para enfeitar a noite. Encheu o mar de peixes e o céu de passarinhos. Fez os leões, as girafas, os coelhos e até as joaninhas.
Por último, Deus fez as pessoas, com muito carinho, parecidas com Ele. E Deus olhou tudo o que tinha feito e disse: "Isso é muito bom!"`,
lic:"Tudo o que existe foi feito por Deus, e você também foi feita com muito amor.",
q:"Qual foi a coisa que Deus criou de que você mais gosta?",
ora:"Querido Deus, obrigada pelo céu, pelas estrelas, pelos bichinhos e pela minha família. Obrigada por me criar com tanto amor. Amém."},

{t:"Adão e Eva no jardim", ref:"Gênesis 2–3", e:"🍎",
txt:`Deus fez um jardim lindo chamado Éden e colocou ali Adão e Eva. Eles podiam comer de todas as frutas, menos de uma árvore. "Dessa não comam", Deus avisou, "porque vai fazer mal a vocês."
Um dia, uma serpente espertalhona falou com Eva: "Pode comer, não vai acontecer nada!" Eva olhou a fruta, achou bonita, comeu e deu para Adão também.
Logo eles ficaram tristes e com vergonha, e se esconderam de Deus. Mas Deus foi procurar por eles. Eles precisaram sair do jardim, mas Deus continuou cuidando deles e prometeu que um dia mandaria alguém para consertar tudo: Jesus!`,
lic:"Obedecer a Deus nos protege. E mesmo quando erramos, Deus continua nos amando.",
q:"Quando você faz algo errado, o que é melhor: se esconder ou pedir desculpas?",
ora:"Senhor, me ajuda a obedecer ao papai, à mamãe e a Ti. Obrigada porque o Teu amor nunca acaba. Amém."},

{t:"Noé e a grande arca", ref:"Gênesis 6–9", e:"🚢",
txt:`Há muito tempo, as pessoas tinham esquecido de Deus e só faziam coisas ruins. Mas havia um homem que amava a Deus: Noé.
Deus disse: "Noé, construa um barco bem grande, uma arca! Vai chover muito." Noé obedeceu, mesmo quando as pessoas riam dele. Martelava, serrava, e a arca foi ficando enorme.
Então os animais chegaram, de dois em dois: elefantes, zebras, macacos, pinguins... Noé e sua família entraram, e Deus fechou a porta.
Choveu quarenta dias e quarenta noites! Mas dentro da arca todos estavam seguros. Quando a água baixou, eles saíram, e Deus colocou no céu um lindo arco-íris como promessa: "Eu vou sempre cuidar de vocês."`,
lic:"Quando obedecemos a Deus, mesmo que os outros não entendam, Ele cuida de nós.",
q:"Quais animais você acha que fizeram mais barulho na arca?",
ora:"Deus, obrigada pelo arco-íris que lembra das Tuas promessas. Me guarda e me protege nesta noite, como guardou Noé. Amém."},

{t:"A torre de Babel", ref:"Gênesis 11", e:"🧱",
txt:`Depois do dilúvio, as pessoas falavam todas a mesma língua. Um dia, elas tiveram uma ideia: "Vamos construir uma torre tão alta que chegue até o céu! Assim todo mundo vai achar a gente importante!"
Mas elas não estavam pensando em Deus, só em si mesmas. Deus viu aquilo e fez uma coisa surpreendente: de repente, cada grupo começou a falar uma língua diferente!
Um pedia "tijolo" e o outro entendia "banana"! Ninguém se entendia mais. Então pararam de construir a torre e se espalharam pelo mundo todo.`,
lic:"Deus não quer que a gente se ache maior que os outros. É melhor ser humilde.",
q:"Você sabe dizer alguma palavra em outra língua?",
ora:"Senhor, me ensina a ser humilde e a fazer tudo para Te agradar, e não para me exibir. Amém."},

{t:"Deus chama Abraão", ref:"Gênesis 12; 15", e:"⭐",
txt:`Abraão morava numa cidade com sua esposa Sara. Um dia Deus falou com ele: "Abraão, saia da sua terra e vá para um lugar que eu vou te mostrar."
Abraão não sabia para onde ia, mas confiou em Deus. Arrumou tudo, colocou nos camelos e partiu.
Certa noite, Deus disse: "Abraão, olhe para o céu e conte as estrelas, se puder." Eram tantas! "Assim será a sua família", Deus prometeu. Abraão e Sara já eram velhinhos e não tinham filhos, mas Abraão acreditou em Deus.`,
lic:"Confiar em Deus é seguir em frente mesmo quando não sabemos tudo.",
q:"Vamos tentar contar as estrelas pela janela? Até quanto você consegue contar?",
ora:"Deus, eu confio em Ti. Obrigada porque cumpres o que prometes. Amém."},

{t:"O nascimento de Isaque", ref:"Gênesis 18; 21", e:"👶",
txt:`Abraão e Sara esperaram muitos e muitos anos por um bebê. Um dia, três visitantes chegaram à tenda deles, e um deles disse: "No ano que vem, Sara vai ter um filho!"
Sara estava escutando atrás da porta e deu uma risada: "Eu? Tão velhinha?" Mas o visitante falou: "Existe alguma coisa difícil demais para Deus?"
E não é que, no ano seguinte, nasceu um menininho? Deram a ele o nome de Isaque, que quer dizer "riso". Sara disse: "Deus me fez rir de alegria!"`,
lic:"Nada é impossível para Deus. Ele cumpre o que promete, no tempo certo.",
q:"O que faz você rir de alegria?",
ora:"Querido Deus, obrigada pelas alegrias que Tu me dás. Me ensina a esperar com paciência. Amém."},

{t:"A escada de Jacó", ref:"Gênesis 28", e:"🪜",
txt:`Jacó estava fazendo uma viagem longa e sozinho. Quando escureceu, ele deitou no chão e usou uma pedra como travesseiro. Que travesseiro duro!
Enquanto dormia, Jacó sonhou com uma escada enorme que ia da terra até o céu, e anjos subiam e desciam por ela. Lá em cima estava Deus, que disse: "Jacó, eu estou com você. Vou te proteger aonde você for."
Jacó acordou e disse: "Deus estava aqui e eu nem sabia!" Ele nunca mais se sentiu sozinho.`,
lic:"Mesmo de noite, no escuro, Deus está pertinho de nós.",
q:"Quando você sente medo à noite, o que pode lembrar?",
ora:"Deus, obrigada porque estás aqui no meu quarto comigo. Manda Teus anjos cuidarem de mim enquanto eu durmo. Amém."},

{t:"José e a túnica colorida", ref:"Gênesis 37", e:"🌈",
txt:`Jacó tinha doze filhos, e José era muito querido pelo pai. Jacó deu a ele uma túnica linda, toda colorida. Os irmãos ficaram com muita inveja.
José também tinha sonhos especiais e contava para os irmãos, o que os deixava ainda mais bravos. Um dia, os irmãos fizeram uma coisa muito feia: jogaram José num buraco e depois o venderam para uns viajantes que iam para o Egito.
José ficou longe de casa, mas não estava sozinho. Deus estava com José o tempo todo e tinha um plano lindo para ele.`,
lic:"A inveja faz a gente machucar quem amamos. Deus está conosco até nos dias tristes.",
q:"Como podemos ficar felizes quando uma irmã ganha algo especial?",
ora:"Senhor, tira a inveja do meu coração. Me ajuda a amar e cuidar da minha irmã. Amém."},

{t:"José perdoa os irmãos", ref:"Gênesis 41–45", e:"🤗",
txt:`No Egito, José passou por momentos difíceis, até foi preso sem ter feito nada errado. Mas Deus o ajudou a explicar os sonhos do rei, o Faraó. Os sonhos avisavam que viria uma grande fome.
O Faraó gostou tanto de José que o fez governador do Egito! José guardou muita comida.
Quando a fome chegou, os irmãos de José vieram ao Egito comprar comida. Eles nem reconheceram José! José poderia se vingar, mas ele chorou e disse: "Sou eu, José, o irmão de vocês! Eu perdoo vocês. Deus transformou o mal em bem."
E a família toda se abraçou de novo.`,
lic:"Perdoar é um presente que deixa o coração leve. Deus pode transformar coisas ruins em boas.",
q:"Tem alguém que você precisa perdoar hoje?",
ora:"Deus, me ensina a perdoar como José perdoou. Abençoa minha família e nos mantém sempre unidos. Amém."},

{t:"O bebê Moisés no cesto", ref:"Êxodo 2", e:"🧺",
txt:`No Egito, um rei malvado não queria que o povo de Deus crescesse. Uma mamãe teve um bebezinho lindo e, para protegê-lo, fez um cesto que não afundava e o colocou no rio, no meio das plantas.
A irmã dele, Miriã, ficou escondida, vigiando o cesto. Então a filha do Faraó foi tomar banho no rio e viu o cesto. "Que bebê lindo!", ela disse.
Miriã correu e perguntou: "Quer que eu chame alguém para cuidar dele?" E chamou a própria mamãe do bebê! A princesa deu a ele o nome de Moisés. Deus cuidou dele direitinho.`,
lic:"Deus cuida dos pequeninos. E irmãs cuidam umas das outras, como Miriã.",
q:"Como você pode cuidar da sua irmã, como Miriã cuidou de Moisés?",
ora:"Querido Deus, obrigada pela minha irmã. Me ajuda a cuidar dela e a protegê-la. Amém."},

{t:"A sarça que não queimava", ref:"Êxodo 3–4", e:"🔥",
txt:`Moisés cresceu e foi morar no deserto, cuidando de ovelhas. Um dia ele viu uma coisa muito estranha: um arbusto pegando fogo, mas que não queimava!
Moisés chegou perto e ouviu uma voz: "Moisés! Tire as sandálias, este lugar é santo. Eu sou Deus." Deus disse: "Meu povo está sofrendo no Egito. Quero que você vá falar com o Faraó para libertá-los."
Moisés ficou com medo: "Eu? Eu não sei falar bem!" Mas Deus respondeu: "Eu vou estar com você." E deu a Moisés seu irmão Arão para ajudar.`,
lic:"Deus usa pessoas comuns, até as que têm medo, para fazer coisas grandes.",
q:"O que você acha difícil de fazer, mas Deus pode te ajudar?",
ora:"Senhor, quando eu tiver medo, me lembra que estás comigo. Me dá coragem. Amém."},

{t:"O mar se abre", ref:"Êxodo 14", e:"🌊",
txt:`Depois de muita coisa acontecer, o Faraó finalmente deixou o povo de Deus sair do Egito. Mas logo se arrependeu e mandou seus soldados atrás deles!
O povo chegou na beira do mar. Na frente, água. Atrás, os soldados. "E agora?", todos gritavam. Moisés disse: "Não tenham medo! Deus vai lutar por vocês."
Moisés levantou o braço, e Deus mandou um vento forte. O mar se abriu em duas paredes de água, e no meio apareceu um caminho seco! Todo mundo atravessou a pé. Do outro lado, eles cantaram e dançaram de alegria.`,
lic:"Quando parece que não tem saída, Deus abre um caminho.",
q:"Vamos imaginar: como devia ser andar no meio das paredes de água?",
ora:"Deus poderoso, obrigada porque sempre encontras um caminho. Eu confio em Ti. Amém."},

{t:"Pão do céu", ref:"Êxodo 16", e:"🍞",
txt:`O povo de Deus estava andando pelo deserto. Lá não tinha mercado, nem padaria, nem plantação. Eles começaram a reclamar: "Estamos com fome!"
Deus disse a Moisés: "Vou mandar pão do céu." E na manhã seguinte, o chão estava coberto de uma coisa branquinha, com gosto de biscoito com mel! Eles chamaram de maná.
Todos os dias Deus mandava o maná, e de tarde mandava até passarinhos para eles comerem. Durante quarenta anos, Deus nunca esqueceu de alimentar o seu povo.`,
lic:"Deus cuida de nós todos os dias e nos dá o que precisamos.",
q:"Qual é a sua comida preferida? Vamos agradecer a Deus por ela?",
ora:"Obrigada, Deus, pela comida de cada dia, pela nossa casa e pela nossa família. Amém."},

{t:"As muralhas de Jericó", ref:"Josué 6", e:"🎺",
txt:`Josué era o novo líder do povo de Deus. Na frente deles havia uma cidade com muralhas altas e fortes: Jericó. Como entrar?
Deus deu um plano diferente: "Andem em volta da cidade uma vez por dia, durante seis dias, em silêncio. No sétimo dia, deem sete voltas, toquem as trombetas e gritem bem alto!"
Parecia estranho, mas eles obedeceram. No sétimo dia, deram as sete voltas, tocaram as trombetas e gritaram: "UUUUUHHH!" E as muralhas caíram! Bum!`,
lic:"Os planos de Deus às vezes parecem estranhos, mas obedecer a Ele sempre dá certo.",
q:"Vamos fazer o grito de Jericó... bem baixinho, para não acordar ninguém?",
ora:"Senhor, me ajuda a obedecer mesmo quando eu não entendo tudo. Amém."},

{t:"Gideão e as tochas", ref:"Juízes 6–7", e:"🔦",
txt:`Gideão era um rapaz que se achava fraco e pequeno. Mas um anjo apareceu e disse: "Gideão, homem forte e corajoso, Deus está com você!" Gideão pensou: "Eu? Forte?"
Deus pediu que ele protegesse o povo de um exército enorme. Gideão juntou muitos soldados, mas Deus disse: "São muitos! Mande alguns para casa." No final, sobraram só trezentos.
De noite, eles cercaram o acampamento inimigo com trombetas e tochas escondidas em jarros. Quebraram os jarros, a luz brilhou, tocaram as trombetas, e os inimigos fugiram assustados! Deus deu a vitória.`,
lic:"Deus vê em nós coragem que nem nós mesmos enxergamos.",
q:"Em que você acha que Deus te fez forte?",
ora:"Deus, obrigada porque Tu me vês forte e corajosa. Quando eu me sentir pequena, me lembra que estás comigo. Amém."},

{t:"Rute, a amiga fiel", ref:"Rute 1–4", e:"🌾",
txt:`Noemi era uma senhora que ficou muito triste, porque perdeu o marido e os filhos. Ela decidiu voltar para sua terra. Rute, sua nora, disse: "Eu vou com você! Para onde você for, eu irei. O seu Deus será o meu Deus."
Lá, elas eram pobres. Rute ia ao campo pegar os grãos de trigo que caíam no chão para fazer pão. O dono do campo, Boaz, viu como Rute era bondosa e mandou deixar mais trigo para ela.
Depois Boaz e Rute se casaram e tiveram um bebê. Noemi ficou feliz de novo, segurando o netinho no colo.`,
lic:"Ser fiel e cuidar de quem está triste agrada muito a Deus.",
q:"Quem você conhece que está precisando de carinho?",
ora:"Senhor, me ensina a ser uma amiga fiel, como Rute. Abençoa a vovó, o vovô e todos que amamos. Amém."},

{t:"O menino Samuel ouve Deus", ref:"1 Samuel 3", e:"👂",
txt:`Samuel era um menino que morava no templo e ajudava o sacerdote Eli. Uma noite, quando Samuel estava deitado, ouviu: "Samuel!"
Ele correu até Eli: "Estou aqui, o senhor me chamou?" "Não chamei, volte a dormir." Isso aconteceu três vezes!
Então Eli entendeu: era Deus chamando! "Se chamar de novo, diga: Fala, Senhor, que o teu servo está ouvindo." Samuel voltou para a cama, e quando Deus chamou, ele respondeu exatamente assim. E Deus conversou com o menino Samuel.`,
lic:"Deus fala também com as crianças. Ele gosta quando paramos para ouvi-Lo.",
q:"Vamos ficar um minutinho em silêncio, pensando em Deus?",
ora:"Fala, Senhor, que eu estou ouvindo. Quero conhecer mais de Ti. Amém."},

{t:"Davi e Golias", ref:"1 Samuel 17", e:"🪨",
txt:`Havia um gigante chamado Golias, enorme, com armadura e uma lança gigante. Todos os dias ele gritava: "Quem tem coragem de lutar comigo?" E os soldados tremiam de medo.
Davi era um menino pastor de ovelhas. Ele disse: "Eu vou! Deus me ajudou a proteger minhas ovelhas de um leão e de um urso. Ele vai me ajudar agora!"
Davi não quis armadura. Pegou só seu estilingue e cinco pedrinhas lisas do riacho. Golias riu dele. Mas Davi girou o estilingue, a pedra voou e acertou bem na testa do gigante. Golias caiu, BUM! Deus deu a vitória ao menino corajoso.`,
lic:"Com Deus, nenhum problema é grande demais.",
q:"Qual é o seu 'gigante', aquilo que te dá medo?",
ora:"Deus, Tu és maior que qualquer gigante. Me dá coragem como a de Davi. Amém."},

{t:"Davi e Jônatas, grandes amigos", ref:"1 Samuel 18–20", e:"🤝",
txt:`Jônatas era filho do rei Saul, um príncipe. Quando conheceu Davi, os dois ficaram melhores amigos. Jônatas deu a Davi sua capa, sua espada e seu arco, como sinal de amizade.
Mas o rei Saul ficou com ciúmes de Davi e queria fazer mal a ele. Jônatas, mesmo sendo filho do rei, avisou o amigo e o ajudou a fugir.
Na despedida, os dois choraram e prometeram: "Seremos amigos para sempre, e nossas famílias também." E Davi cumpriu a promessa, cuidando da família de Jônatas anos depois.`,
lic:"Um amigo de verdade protege, ajuda e cumpre suas promessas.",
q:"Quem é seu melhor amigo ou amiga? Por quê?",
ora:"Obrigada, Deus, pelos meus amigos. Me ajuda a ser uma boa amiga, que cuida e protege. Amém."},

{t:"Salomão pede sabedoria", ref:"1 Reis 3", e:"👑",
txt:`Salomão, filho de Davi, virou rei quando ainda era bem jovem. Uma noite, Deus apareceu num sonho e disse: "Peça o que você quiser, e eu te darei."
Salomão podia pedir ouro, brinquedos, castelos... Mas ele pediu: "Senhor, me dá sabedoria para cuidar bem do povo e saber o que é certo."
Deus ficou tão feliz com o pedido que disse: "Vou te dar sabedoria, e também riquezas!" Salomão se tornou o rei mais sábio do mundo, e pessoas vinham de longe para ouvir seus conselhos.`,
lic:"Ser sábio, saber escolher o certo, vale mais que qualquer tesouro.",
q:"Se Deus te perguntasse 'o que você quer?', o que você pediria?",
ora:"Senhor, me dá sabedoria para escolher o que é certo, na escola e em casa. Amém."},

{t:"Elias e os corvos", ref:"1 Reis 17", e:"🐦",
txt:`Elias era um profeta de Deus. Houve um tempo em que não chovia, e as plantações secaram. Deus disse: "Elias, vá para perto de um riacho e fique lá. Eu vou te alimentar."
E sabe quem trazia comida para Elias? Corvos! Pássaros pretinhos que, toda manhã e toda tarde, chegavam voando com pão e carne no bico.
Elias bebia água do riacho e comia o que os corvos traziam. Deus usou até passarinhos para cuidar dele!`,
lic:"Deus tem muitos jeitos de cuidar de nós, até os mais surpreendentes.",
q:"De que jeitos Deus cuida de você todos os dias?",
ora:"Deus, obrigada pelos jeitinhos diferentes com que cuidas de mim. Amém."},

{t:"Naamã e o rio Jordão", ref:"2 Reis 5", e:"💧",
txt:`Naamã era um general importante, mas tinha uma doença na pele. Na casa dele trabalhava uma menina que tinha vindo de Israel. Ela disse: "Se meu senhor fosse falar com o profeta Eliseu, ele ficaria curado!"
Naamã foi. Eliseu mandou dizer: "Vá se lavar sete vezes no rio Jordão." Naamã ficou bravo: "Só isso? Num rio sujo?" Mas seus servos o convenceram.
Ele mergulhou uma, duas, três... sete vezes! E quando saiu da água, sua pele estava lisinha como a de uma criança. Naamã disse: "Agora sei que só existe um Deus verdadeiro!"`,
lic:"Uma criança corajosa ajudou um general. Até os pequenos podem falar de Deus.",
q:"Você pode contar para alguém sobre Deus? Para quem?",
ora:"Deus, quero ser como a menina da história e falar do Teu amor para as pessoas. Amém."},

{t:"Daniel na cova dos leões", ref:"Daniel 6", e:"🦁",
txt:`Daniel amava a Deus e orava três vezes por dia, na janela de casa. Uns homens invejosos fizeram o rei criar uma lei: "Ninguém pode orar a nenhum deus, só ao rei. Quem desobedecer vai para a cova dos leões!"
Daniel sabia da lei, mas continuou orando a Deus. Então ele foi jogado na cova com leões famintos! O rei, que gostava de Daniel, não dormiu a noite inteira.
De manhã cedinho, o rei correu até a cova: "Daniel, seu Deus te salvou?" E Daniel respondeu: "Sim! Deus mandou um anjo que fechou a boca dos leões!" Daniel estava sem nenhum arranhão.`,
lic:"Conversar com Deus todos os dias é muito importante, e Ele nos protege.",
q:"Que horas do dia você gosta de conversar com Deus?",
ora:"Deus, assim como guardaste Daniel, guarda a mim e minha família esta noite. Amém."},

{t:"A rainha Ester", ref:"Ester 2–8", e:"👸",
txt:`Ester era uma moça judia, órfã, criada pelo primo Mardoqueu. Ela era tão bonita e gentil que o rei a escolheu para ser rainha!
Um homem mau chamado Hamã fez um plano para acabar com todo o povo de Ester. Mardoqueu disse: "Ester, talvez você tenha virado rainha justamente para salvar o seu povo!"
Mas falar com o rei sem ser chamada era perigoso. Ester pediu que todos orassem por ela e disse: "Eu vou!" Ela foi corajosa, falou com o rei, e o plano malvado foi descoberto. O povo foi salvo!`,
lic:"Deus coloca a gente no lugar certo para ajudar os outros. Coragem é fazer o certo mesmo com medo.",
q:"Você já teve que ser corajosa como a rainha Ester?",
ora:"Senhor, me usa para ajudar as pessoas. Me dá coragem para fazer o que é certo. Amém."},

{t:"Jonas e o grande peixe", ref:"Jonas 1–3", e:"🐋",
txt:`Deus disse a Jonas: "Vá à cidade de Nínive e diga para eles pararem de fazer coisas ruins." Mas Jonas não quis ir! Pegou um barco para o lado contrário.
No mar veio uma tempestade enorme. Jonas disse aos marinheiros: "A culpa é minha, me joguem no mar." E plof! Jonas caiu na água, e um peixe gigante o engoliu!
Três dias dentro da barriga do peixe, Jonas orou: "Deus, me perdoa!" Então o peixe cuspiu Jonas na praia. Dessa vez ele obedeceu, foi a Nínive, e o povo se arrependeu. Deus perdoou todos eles.`,
lic:"Não adianta fugir de Deus. Ele nos dá uma nova chance quando nos arrependemos.",
q:"Como você acha que era dentro da barriga do peixe?",
ora:"Deus, obrigada pelas novas chances. Me ajuda a obedecer logo na primeira vez. Amém."},

{t:"O nascimento de Jesus", ref:"Lucas 1–2", e:"🌟",
txt:`Um anjo chamado Gabriel visitou uma moça chamada Maria: "Você vai ter um bebê, e ele será o Filho de Deus. O nome dele será Jesus."
Maria e José precisaram viajar até Belém. Quando chegaram, não havia lugar nas hospedarias. Então Jesus nasceu num lugar simples, onde ficavam os animais, e foi deitado numa manjedoura, com palha macia.
Naquela noite, anjos apareceram para uns pastores no campo, cantando: "Glória a Deus! Nasceu o Salvador!" Os pastores correram para ver o bebê. E uma estrela brilhante guiou sábios do Oriente, que trouxeram presentes para o Rei Jesus.`,
lic:"Jesus é o maior presente que Deus deu ao mundo.",
q:"Se você fosse visitar o bebê Jesus, que presente levaria?",
ora:"Obrigada, Deus, por mandar Jesus. Ele é o melhor presente de todos! Amém."},

{t:"Jesus menino no templo", ref:"Lucas 2:41-52", e:"📜",
txt:`Quando Jesus tinha doze anos, foi com Maria, José e muitos parentes a Jerusalém para uma grande festa. Na volta, cada um achou que Jesus estava com outro grupo. Depois de um dia de caminhada, perceberam: "Cadê o Jesus?"
Voltaram correndo para Jerusalém e procuraram por três dias! Finalmente encontraram Jesus no templo, sentado com os professores, ouvindo e fazendo perguntas. Todos estavam admirados com a inteligência dele.
Jesus disse: "Vocês não sabiam que eu devia estar na casa do meu Pai?" Depois voltou para casa e obedecia a Maria e José. E crescia em sabedoria e em graça.`,
lic:"Jesus também foi criança, e obedecia aos seus pais.",
q:"O que você gostaria de perguntar para Jesus?",
ora:"Jesus, Tu também foste criança. Me ajuda a crescer em sabedoria e a obedecer meus pais. Amém."},

{t:"Jesus acalma a tempestade", ref:"Marcos 4:35-41", e:"⛵",
txt:`Jesus e seus amigos entraram num barco para atravessar um lago. Jesus estava cansado e dormiu num travesseiro no fundo do barco.
De repente, veio uma tempestade fortíssima! O vento soprava, as ondas entravam no barco, e os discípulos gritaram: "Mestre, acorda! Vamos afundar!"
Jesus se levantou, olhou para o vento e para o mar e disse: "Silêncio! Fique quieto!" E na mesma hora, tudo ficou calmo. Os discípulos se olharam espantados: "Quem é este, que até o vento e o mar obedecem?"`,
lic:"Jesus é mais forte que qualquer tempestade, até as que sentimos por dentro.",
q:"Quando você fica com medo, o que pode pedir a Jesus?",
ora:"Jesus, acalma meu coração como acalmaste o mar. Me dá uma noite tranquila. Amém."},

{t:"O menino e os pães", ref:"João 6:1-14", e:"🐟",
txt:`Uma multidão enorme seguiu Jesus para ouvir suas histórias. Eram mais de cinco mil pessoas! Ficou tarde e todos estavam com fome. Mas onde arranjar comida para tanta gente?
André encontrou um menino que tinha um lanchinho: cinco pães e dois peixinhos. "Mas o que é isso para tanta gente?"
O menino ofereceu seu lanche para Jesus. Jesus agradeceu a Deus, partiu os pães e os peixes, e os discípulos foram distribuindo... e a comida não acabava! Todos comeram até ficar satisfeitos, e ainda sobraram doze cestos cheios!`,
lic:"Quando damos o pouco que temos para Jesus, Ele faz coisas grandes.",
q:"O que você pode repartir com alguém amanhã?",
ora:"Jesus, quero dividir o que tenho, como o menino dos pães. Me ensina a ser generosa. Amém."},

{t:"Jesus e as crianças", ref:"Marcos 10:13-16", e:"🧒",
txt:`Muitas mamães e papais traziam seus filhos para Jesus abençoar. Mas os discípulos achavam que Jesus estava ocupado demais: "Levem essas crianças embora, o Mestre não tem tempo!"
Jesus ficou chateado com os discípulos e disse: "Deixem as crianças virem a mim! Não as impeçam. O Reino de Deus pertence a quem é como elas."
Então Jesus pegou as crianças no colo, colocou as mãos sobre elas e as abençoou, uma por uma.`,
lic:"Jesus sempre tem tempo para você. Você é muito importante para Ele.",
q:"Como você acha que foi ficar no colo de Jesus?",
ora:"Jesus, obrigada porque eu sou importante para Ti. Me abençoa e me dá um abraço esta noite. Amém."},

{t:"A ovelha perdida", ref:"Lucas 15:1-7", e:"🐑",
txt:`Jesus contou uma história: Um pastor tinha cem ovelhas. Todo dia ele as contava: noventa e sete, noventa e oito, noventa e nove... Ué! Faltava uma!
O pastor deixou as noventa e nove num lugar seguro e foi procurar a ovelhinha perdida. Procurou atrás das pedras, nos arbustos, subiu morros, até que ouviu: "Béééé!"
Ele a encontrou, colocou nos ombros, todo feliz, e voltou para casa. Chamou os amigos: "Vamos fazer festa! Achei minha ovelha perdida!" Jesus disse que é assim que Deus se alegra com cada um de nós.`,
lic:"Você é tão importante para Deus que Ele iria te procurar em qualquer lugar.",
q:"Vamos imitar o barulho da ovelhinha? Bem baixinho!",
ora:"Jesus, Tu és o meu Bom Pastor. Obrigada por cuidar de mim e nunca me deixar sozinha. Amém."},

{t:"O bom samaritano", ref:"Lucas 10:25-37", e:"🩹",
txt:`Jesus contou: Um homem estava viajando, e uns ladrões o atacaram, levaram tudo e o deixaram machucado na estrada.
Passou um sacerdote, viu o homem... e foi para o outro lado da estrada. Passou outro homem importante... e também fingiu que não viu.
Então passou um samaritano, alguém de um povo que nem era amigo do povo daquele homem. Mas ele parou, cuidou das feridas, colocou o homem no seu burrinho, levou para uma pousada e pagou tudo para ele ficar bem. Jesus perguntou: "Quem foi o bom vizinho?" E disse: "Vá e faça o mesmo."`,
lic:"Amar o próximo é ajudar quem precisa, mesmo que seja diferente de nós.",
q:"Como você pode ajudar alguém na escola esta semana?",
ora:"Senhor, abre meus olhos para ver quem precisa de ajuda. Quero ser uma boa samaritana. Amém."},

{t:"Zaqueu sobe na árvore", ref:"Lucas 19:1-10", e:"🌳",
txt:`Zaqueu era um homem baixinho que cobrava impostos e às vezes pegava dinheiro a mais das pessoas. Ninguém gostava muito dele.
Um dia, Jesus ia passar pela cidade, e Zaqueu queria muito ver Jesus. Mas a multidão era grande e ele era baixinho! Então ele correu na frente e subiu numa árvore.
Quando Jesus passou, parou bem embaixo da árvore, olhou para cima e disse: "Zaqueu, desça depressa! Hoje vou ficar na sua casa!" Zaqueu ficou tão feliz que mudou de vida: devolveu o dinheiro que tinha pego, e ainda mais!`,
lic:"Jesus conhece o seu nome e quer estar com você. O amor de Jesus muda o coração.",
q:"Se Jesus viesse jantar na nossa casa, o que a gente faria?",
ora:"Jesus, vem morar no meu coração e na nossa casa. Amém."},

{t:"Jesus ressuscitou!", ref:"Mateus 28; Lucas 24", e:"✝️",
txt:`Jesus amava tanto as pessoas que deu a sua vida na cruz por todos nós. Seus amigos ficaram muito tristes, e o corpo de Jesus foi colocado num túmulo fechado com uma pedra grandona.
Mas no terceiro dia, bem cedinho, algumas mulheres foram ao túmulo... e a pedra estava rolada! Um anjo de roupa brilhante disse: "Não tenham medo! Jesus não está aqui. Ele ressuscitou, como tinha dito!"
Elas correram para contar aos discípulos. E depois Jesus apareceu para eles, vivo! Que alegria! Jesus venceu a morte, e está vivo para sempre.`,
lic:"Jesus está vivo! O amor de Deus é mais forte que tudo.",
q:"Como você acha que os amigos de Jesus se sentiram quando O viram vivo?",
ora:"Jesus, obrigada por me amar tanto. Que alegria saber que estás vivo e comigo sempre! Amém."},

{t:"Pedro anda sobre as águas", ref:"Mateus 14:22-33", e:"🚶",
txt:`Era noite, e os discípulos estavam num barco no meio do lago, com muito vento. De repente, viram alguém andando sobre a água! "É um fantasma!", gritaram.
"Calma, sou eu, Jesus!", ele disse. Pedro falou: "Senhor, se és tu, manda eu ir até aí!" "Venha!", disse Jesus.
Pedro saiu do barco e... andou sobre a água! Mas quando olhou para as ondas e o vento, ficou com medo e começou a afundar. "Senhor, me salva!" Jesus estendeu a mão na hora e o segurou.`,
lic:"Quando olhamos para Jesus, e não para os problemas, ficamos firmes.",
q:"O que te ajuda a lembrar de olhar para Jesus?",
ora:"Jesus, segura minha mão sempre. Quando eu tiver medo, me ajuda a olhar para Ti. Amém."},

{t:"Paulo e Silas cantam na prisão", ref:"Atos 16:16-34", e:"🎶",
txt:`Paulo e Silas viajavam contando a todos sobre Jesus. Numa cidade, eles foram presos injustamente, com os pés presos em troncos de madeira.
Era meia-noite. Em vez de chorar e reclamar, sabe o que eles fizeram? Começaram a orar e a cantar louvores a Deus! Os outros presos ficaram ouvindo.
De repente, um terremoto! As portas se abriram e as correntes se soltaram. O carcereiro ficou com medo, mas Paulo disse: "Estamos todos aqui!" O carcereiro perguntou como conhecer Jesus, e naquela mesma noite ele e toda a sua família creram em Jesus.`,
lic:"Louvar a Deus nos momentos difíceis enche o coração de força e alegria.",
q:"Qual música de Deus você mais gosta de cantar?",
ora:"Deus, mesmo nos dias difíceis eu quero cantar para Ti. Obrigada por estar sempre comigo. Amém."}
];
