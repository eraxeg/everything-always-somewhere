var countdown, extension_status, timerFunction, i, epilepticValue, currentId, sequential;

restoreOptions();
startTimer();

function restoreOptions() {
  chrome.storage.sync.get({
    countdown: 16,
    epilepticEnable: true,
    sequentialEnable: false
  }, function(items) {
    countdown = items.countdown;
    epilepticValue = items.epilepticEnable;
    sequential = items.sequentialEnable;
  });
}

function stopTimer() {
  clearInterval(timerFunction);
  chrome.runtime.sendMessage("");
}

function startTimer() {
  i = 0;
  timerFunction = setInterval(eachSecond, 1000);
  chrome.runtime.sendMessage({"getUrl": true});
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.tabUrl) {
      // console.log("got tabUrl: " + request.tabUrl);
      currentId = getWebsiteByUrl(request.tabUrl).id;
      // console.log("set currentId to: " + getWebsiteByUrl(request.tabUrl).id);
    }
  }
);

function eachSecond() {
  i++;
  chrome.runtime.sendMessage(countdown - i);
  if (i - countdown >= 0){
    i = 0;
    changePage(getWebsite());
  }
  if (extension_status != 'on'){stopTimer();}
}

function changePage(page) {
  chrome.runtime.sendMessage(page);
}

function getWebsite(){
  var returnedPage, randomIndex;
  // chrome.runtime.sendMessage({"getUrl": true});
  if (currentId === undefined || sequential === false) {
    do {
      returnedPage = getRandomPage();
    } while (checkAgain(returnedPage));
  } else {
    do {
      returnedPage = getNextPage();
    } while (checkAgain(returnedPage));
  }
  return returnedPage;
}

function checkAgain(returnedPage){
  var notOk = returnedPage.show === false ||
  returnedPage.flash === true ||
  (epilepticValue === true && returnedPage.epileptic);
  return notOk;
}

function getRandomPage() {
  randomIndex = Math.floor(Math.random() * m_websites.websites.length);
  var randomPage = m_websites.websites[randomIndex];
  return randomPage;
}

function getNextPage() {
  // decrementing currentId and assigning result to nextId
  var nextId = --currentId;
  // if nextId is below zero, set nextId to the id of the first
  // website in the array, which also should be the latest
  if (nextId <= 0){
    nextId = m_websites.websites[0].id;
  }
  // get website by the id
  var nextPage = getWebsiteById(nextId);
  return nextPage;
}

function getWebsiteById(id){
  var website = m_websites.websites.filter(item => item.id === id);
  // if none is found, return first website in array
  if (website.length === 0) {
    // console.log("no website with id: " + id);
    website = m_websites.websites;
  }
  return website[0];
}

function getWebsiteByUrl(url){
  var website = m_websites.websites.filter(item => item.url === url);
  // if none is found, return first website in array
  if (website.length === 0) {
    // console.log("no website with url: " + url);
    website = m_websites.websites;
  }
  return website[0];
}

//------------------------------------------------------------------------------

var m_websites = {
  "websites": [
    {
      "url": "http://www.manualsequence.com/",
      "name": "manual sequence .com",
      "mobile": true,
      "year": 2017,
      "id": 109
    },
    {
      "url": "http://www.thisgrey.com/",
      "name": "this grey .com",
      "mobile": true,
      "year": 2017,
      "id": 108
    },
    {
      "url": "http://www.nearnext.com/",
      "name": "near next .com",
      "mobile": true,
      "year": 2017,
      "id": 107
    },
    {
      "url": "http://www.watchyourot.com/",
      "name": "watch you rot .com",
      "mobile": true,
      "year": 2017,
      "id": 106
    },
    {
      "url": "http://www.doublenever.com/",
      "name": "double never .com",
      "mobile": true,
      "year": 2017,
      "id": 105
    },
    {
      "url": "http://www.taskunrelated.com/",
      "name": "task unrelated .com",
      "mobile": true,
      "year": 2017,
      "id": 104,
      "epileptic": true
    },
    {
      "url": "http://www.lotsofmany.com/",
      "name": "lots of many .com",
      "mobile": true,
      "year": 2017,
      "id": 103
    },
    {
      "url": "http://www.eggalone.com/",
      "name": "egg alone .com",
      "mobile": true,
      "year": 2017,
      "id": 102
    },
    {
      "url": "http://www.blankwindows.com/",
      "name": "blank windows .com",
      "mobile": true,
      "show": false,
      "year": 2016,
      "id": 101
    },
    {
      "url": "http://www.newoldhotcold.com/",
      "name": "new old hot cold .com",
      "mobile": true,
      "year": 2016,
      "id": 100,
      "epileptic": true
    },
    {
      "url": "http://www.somethingopen.com/",
      "name": "something open .com",
      "mobile": true,
      "year": 2016,
      "id": 99
    },
    {
      "url": "http://www.floatingthe.com/",
      "name": "floating the .com",
      "mobile": true,
      "year": 2016,
      "id": 98
    },
    {
      "url": "http://www.terminalobject.com/",
      "name": "terminal object .com",
      "mobile": true,
      "year": 2016,
      "id": 97
    },
    {
      "url": "http://www.crossdivisions.com/",
      "name": "cross divisions .com",
      "mobile": true,
      "clickable": true,
      "year": 2016,
      "id": 96
    },
    {
      "url": "http://www.herethat.com/",
      "name": "here that .com",
      "mobile": true,
      "year": 2016,
      "id": 95
    },
    {
      "url": "http://www.unknownlandscape.com/",
      "name": "unknown landscape .com",
      "mobile": true,
      "year": 2016,
      "id": 94
    },
    {
      "url": "http://www.thisemptyroom.com/",
      "name": "this empty room .com",
      "mobile": true,
      "year": 2016,
      "id": 93
    },
    {
      "url": "http://www.floatbounce.com/",
      "name": "float bounce .com",
      "mobile": true,
      "year": 2016,
      "id": 92
    },
    {
      "url": "http://www.infinitething.com/",
      "name": "infinite thing .com",
      "mobile": true,
      "clickable": true,
      "year": 2016,
      "id": 91
    },
    {
      "url": "http://www.trashloop.com/",
      "name": "trash loop .com",
      "mobile": true,
      "show": false,
      "year": 2015,
      "id": 90
    },
    {
      "url": "http://www.abstractbrowsing.net/",
      "name": "abstract browsing .net",
      "show": false,
      "year": 2014,
      "id": 89
    },
    {
      "url": "http://www.silentsilence.com/",
      "name": "silent silence .com",
      "mobile": true,
      "clickable": true,
      "show": true,
      "year": 2014,
      "id": 88
    },
    {
      "url": "http://www.nevernowhere.com/",
      "name": "never nowhere .com",
      "mobile": true,
      "year": 2014,
      "id": 87
    },
    {
      "url": "http://www.tryingtrying.com/",
      "name": "trying trying .com",
      "mobile": true,
      "year": 2014,
      "id": 86
    },
    {
      "url": "http://www.yesnoif.com/",
      "name": "yes no if .com",
      "mobile": true,
      "show": false,
      "clickable": true,
      "year": 2014,
      "id": 85
    },
    {
      "url": "http://www.softslow.com/",
      "name": "soft slow .com",
      "mobile": true,
      "year": 2014,
      "id": 84
    },
    {
      "url": "http://www.neogeocity.com/",
      "name": "neo geo city .com",
      "mobile": true,
      "year": 2014,
      "id": 83
    },
    {
      "url": "http://www.oozemove.com/",
      "name": "ooze move .com",
      "mobile": true,
      "year": 2014,
      "id": 82
    },
    {
      "url": "http://www.remotelydistant.com/",
      "name": "remotely distant .com",
      "mobile": true,
      "clickable": true,
      "year": 2014,
      "id": 81
    },
    {
      "url": "http://www.sinkslow.com/",
      "name": "sink slow .com",
      "mobile": true,
      "year": 2014,
      "id": 80
    },
    {
      "url": "http://www.homagetothe.com/",
      "name": "homage to the .com",
      "mobile": true,
      "year": 2014,
      "id": 79
    },
    {
      "url": "http://www.innerinterior.com/",
      "name": "inner interior .com",
      "mobile": true,
      "clickable": true,
      "show": false,
      "year": 2014,
      "id": 78
    },
    {
      "url": "http://www.thisthatnow.com/",
      "name": "this that now .com",
      "mobile": true,
      "year": 2014,
      "id": 77,
      "epileptic": true
    },
    {
      "url": "http://www.noifyes.com/",
      "name": "no if yes .com",
      "mobile": true,
      "moveable": true,
      "clickable": true,
      "year": 2014,
      "id": 76
    },
    {
      "url": "http://www.blackgreyblack.com/",
      "name": "black grey black .com",
      "mobile": true,
      "moveable": true,
      "year": 2014,
      "id": 75
    },
    {
      "url": "http://www.roomwarp.com/",
      "name": "room warp .com",
      "mobile": true,
      "moveable": true,
      "year": 2014,
      "id": 74
    },
    {
      "url": "http://www.slickquick.com/",
      "name": "slick quick .com",
      "mobile": true,
      "clickable": true,
      "year": 2014,
      "id": 73
    },
    {
      "url": "http://www.pinkyellowblue.com/",
      "name": "pink yellow blue .com",
      "mobile": true,
      "year": 2014,
      "id": 72
    },
    {
      "url": "http://www.openthatwindow.com/",
      "name": "open that window .com",
      "mobile": true,
      "show": false,
      "year": 2014,
      "id": 71
    },
    {
      "url": "http://www.deepsadness.com/",
      "name": "deep sadness .com",
      "mobile": true,
      "show": false,
      "year": 2014,
      "id": 70
    },
    {
      "url": "http://www.flyingfrying.com/",
      "name": "flying frying .com",
      "mobile": true,
      "show": false,
      "year": 2014,
      "id": 69
    },
    {
      "url": "http://www.fillthisup.com/",
      "name": "fill this up .com",
      "mobile": true,
      "show": false,
      "year": 2014,
      "id": 68
    },
    {
      "url": "http://www.slowempty.com/",
      "name": "slow empty .com",
      "mobile": true,
      "year": 2013,
      "id": 67
    },
    {
      "url": "http://www.ifeelstrange.com/",
      "name": "i feel strange .com",
      "mobile": true,
      "clickable": true,
      "draggable": true,
      "year": 2013,
      "id": 66
    },
    {
      "url": "http://www.everythingalwayseverywhere.com/",
      "name": "everything always everywhere .com",
      "mobile": true,
      "year": 2013,
      "id": 65
    },
    {
      "url": "http://www.maybewhat.com/",
      "name": "maybe what .com",
      "mobile": true,
      "year": 2013,
      "id": 64
    },
    {
      "url": "http://www.nothingeverhappens.com/",
      "name": "nothing ever happens .com",
      "mobile": true,
      "year": 2013,
      "id": 63
    },
    {
      "url": "http://www.futureisuncertain.com/",
      "name": "future is uncertain .com",
      "mobile": true,
      "show": false,
      "year": 2013,
      "id": 62
    },
    {
      "url": "http://www.ifnoyes.com/",
      "name": "if no yes.com",
      "mobile": true,
      "clickable": true,
      "year": 2013,
      "id": 61
    },
    {
      "url": "http://www.hexattack.com/",
      "name": "hex attack .com",
      "mobile": true,
      "year": 2013,
      "id": 60,
      "epileptic": true
    },
    {
      "url": "http://www.ifyesno.com/",
      "name": "if yes no.com",
      "mobile": true,
      "clickable": false,
      "moveable": true,
      "year": 2013,
      "id": 59
    },
    {
      "url": "http://www.randomfear.com/",
      "name": "random fear .com",
      "mobile": true,
      "clickable": true,
      "moveable": true,
      "year": 2013,
      "id": 58
    },
    {
      "url": "http://www.lookingatsomething.com/",
      "name": "looking at something .com",
      "mobile": true,
      "moveable": true,
      "year": 2013,
      "id": 57
    },
    {
      "url": "http://www.textfreebrowsing.com/",
      "name": "text free browsing .com",
      "clickable": false,
      "show": false,
      "year": 2013,
      "id": 56
    },
    {
      "url": "http://www.openthiswindow.com/",
      "name": "open this window .com",
      "mobile": true,
      "show": false,
      "year": 2012,
      "id": 55
    },
    {
      "url": "http://www.innerdoubts.com/",
      "name": "inner doubts .com",
      "mobile": true,
      "clickable": true,
      "show": true,
      "year": 2012,
      "id": 54
    },
    {
      "url": "http://www.violentpower.com/",
      "name": "violent power.com",
      "mobile": true,
      "show": false,
      "clickable": true,
      "year": 2012,
      "id": 53
    },
    {
      "url": "http://www.movenowthinklater.com/",
      "name": "move now think later .com",
      "mobile": true,
      "year": 2012,
      "id": 52
    },
    {
      "url": "http://www.mechanicalwater.com/",
      "name": "mechanical water .com",
      "flash": true,
      "year": 2012,
      "id": 51
    },
    {
      "url": "http://www.intotime.us/",
      "name": "into time .us",
      "mobile": true,
      "show": false,
      "clickable": true,
      "year": 2012,
      "id": 50
    },
    {
      "url": "http://www.almostcalm.com/",
      "name": "almost calm .com",
      "mobile": true,
      "moveable": true,
      "year": 2012,
      "id": 49
    },
    {
      "url": "http://www.likethisforever.com/",
      "name": "like this forever .com",
      "flash": true,
      "year": 2011,
      "id": 48
    },
    {
      "url": "http://www.intotime.org/",
      "name": "into time .org",
      "mobile": true,
      "show": false,
      "clickable": true,
      "year": 2011,
      "id": 47
    },
    {
      "url": "http://www.fallingfalling.com/",
      "name": "falling falling .com",
      "mobile": true,
      "year": 2011,
      "id": 46
    },
    {
      "url": "http://www.tossingturning.com/",
      "name": "tossing turning .com",
      "flash": true,
      "year": 2011,
      "id": 45
    },
    {
      "url": "http://www.sadforjapan.com/",
      "name": "sad for japan.com",
      "flash": true,
      "year": 2011,
      "id": 44
    },
    {
      "url": "http://www.lovegameset.com/",
      "name": "love game set .com",
      "flash": true,
      "year": 2011,
      "id": 43
    },
    {
      "url": "http://www.goodbyefarewell.com/",
      "name": "good bye farewell .com",
      "flash": true,
      "year": 2011,
      "id": 42
    },
    {
      "url": "http://www.burningmytime.com/",
      "name": "burning my time .com",
      "flash": true,
      "year": 2011,
      "id": 41
    },
    {
      "url": "http://www.artwebsitesalescontract.com/",
      "name": "art website sales contract .com",
      "mobile": "false",
      "show": false,
      "year": 2011,
      "id": 40
    },
    {
      "url": "http://www.towardsandbeyond.com/",
      "name": "towards and beyond .com",
      "flash": true,
      "year": 2010,
      "id": 39
    },
    {
      "url": "http://www.yesforsure.com/",
      "name": "yes for sure .com",
      "clickable": false,
      "flash": true,
      "year": 2010,
      "id": 38
    },
    {
      "url": "http://www.pleaselike.com/",
      "name": "please like .com",
      "clickable": false,
      "show": false,
      "year": 2010,
      "id": 37
    },
    {
      "url": "http://www.flaminglog.com/",
      "name": "flaming log .com",
      "flash": true,
      "year": 2010,
      "id": 36
    },
    {
      "url": "http://www.tothewater.com/",
      "name": "to the water .com",
      "mobile": true,
      "show": false,
      "year": 2010,
      "id": 35
    },
    {
      "url": "http://www.nekromisantrop.com/",
      "name": "nekro misantrop .com",
      "flash": true,
      "year": 2010,
      "id": 34,
      "epileptic": true
    },
    {
      "url": "http://www.intotime.com/",
      "name": "into time .com",
      "mobile": true,
      "show": false,
      "clickable": true,
      "year": 2010,
      "id": 33
    },
    {
      "url": "http://www.deepblackhole.com/",
      "name": "deep black hole .com",
      "flash": true,
      "year": 2010,
      "id": 32
    },
    {
      "url": "http://www.closedshut.com/",
      "name": "closed shut .com",
      "flash": true,
      "year": 2009,
      "id": 31
    },
    {
      "url": "http://www.fromthedarkpast.com/",
      "name": "from the dark past .com",
      "flash": true,
      "year": 2009,
      "id": 30
    },
    {
      "url": "http://www.hotdoom.com/",
      "name": "hot doom .com",
      "mobile": true,
      "year": 2009,
      "id": 29
    },
    {
      "url": "http://www.hybridmoment.com/",
      "name": "hybrid moment .com",
      "mobile": true,
      "year": 2009,
      "id": 28
    },
    {
      "url": "http://www.electricboogiewoogie.com/",
      "name": "electric boogie woogie .com",
      "mobile": true,
      "year": 2009,
      "id": 27
    },
    {
      "url": "http://www.beefchickenpork.com/",
      "name": "beef chicken pork .com",
      "mobile": true,
      "show": false,
      "year": 2009,
      "id": 26
    },
    {
      "url": "http://www.aestheticecho.com/",
      "name": "aesthetic echo .com",
      "flash": true,
      "year": 2009,
      "id": 25
    },
    {
      "url": "http://www.coldvoid.com/",
      "name": "cold void .com",
      "flash": true,
      "year": 2008,
      "id": 24
    },
    {
      "url": "http://www.colorflip.com/",
      "name": "color flip .com",
      "flash": true,
      "year": 2008,
      "id": 23
    },
    {
      "url": "http://www.leduchamp.com/",
      "name": "le duchamp .com",
      "flash": true,
      "year": 2008,
      "id": 22
    },
    {
      "url": "http://www.popcornpainting.com/",
      "name": "popcorn painting .com",
      "mobile": true,
      "year": 2008,
      "id": 21
    },
    {
      "url": "http://www.jellotime.com/",
      "name": "jello time .com",
      "flash": true,
      "year": 2007,
      "id": 20
    },
    {
      "url": "http://www.brokenself.com/",
      "name": "broken self .com",
      "flash": true,
      "year": 2007,
      "id": 19
    },
    {
      "url": "http://www.flamingcursor.com/",
      "name": "flaming cursor .com",
      "show": false,
      "flash": true,
      "year": 2007,
      "id": 18
    },
    {
      "url": "http://www.futurephysics.com/",
      "name": "future physics .com",
      "flash": true,
      "year": 2007,
      "id": 17
    },
    {
      "url": "http://www.biglongnow.com/",
      "name": "big long now .com",
      "flash": true,
      "year": 2007,
      "id": 16
    },
    {
      "url": "http://www.vaiavanti.com/",
      "name": "vai avanti .com",
      "flash": true,
      "year": 2006,
      "id": 15
    },
    {
      "url": "http://www.papertoilet.com/",
      "name": "paper toilet .com",
      "mobile": true,
      "show": false,
      "year": 2006,
      "id": 14
    },
    {
      "url": "http://www.muchbetterthanthis.com/",
      "name": "much better than this .com",
      "mobile": true,
      "year": 2006,
      "id": 13
    },
    {
      "url": "http://www.pleasetouchme.com/",
      "name": "please touch me .com",
      "mobile": true,
      "show": false,
      "draggable": true,
      "year": 2005,
      "id": 12
    },
    {
      "url": "http://www.nosquito.biz/",
      "name": "nosquito .biz",
      "flash": true,
      "year": 2005,
      "id": 11
    },
    {
      "url": "http://www.itwillneverbethesame.com/",
      "name": "it will never be the same .com",
      "flash": true,
      "year": 2004,
      "id": 10
    },
    {
      "url": "http://www.theendofreason.com/",
      "name": "the end of reason .com",
      "flash": true,
      "year": 2004,
      "id": 9
    },
    {
      "url": "http://www.fataltotheflesh.com/",
      "name": "fatal to the flesh .com",
      "flash": true,
      "year": 2004,
      "id": 8
    },
    {
      "url": "http://www.onandoff.org/",
      "name": "on and off .org",
      "flash": true,
      "year": 2003,
      "id": 7
    },
    {
      "url": "http://www.everythingyouseeisinthepast.com/",
      "name": "everything you see is in the past .com",
      "flash": true,
      "year": 2003,
      "id": 6
    },
    {
      "url": "http://www.wewillattack.com/",
      "name": "we will attack .com",
      "mobile": true,
      "clickable": true,
      "show": false,
      "year": 2002,
      "id": 5
    },
    {
      "url": "http://www.iamveryverysorry.com/",
      "name": "i am very very sorry .com",
      "flash": true,
      "year": 2002,
      "id": 4
    },
    {
      "url": "http://www.whywashesad.com/",
      "name": "why was he sad .com",
      "clickable": false,
      "flash": true,
      "year": 2002,
      "id": 3
    },
    {
      "url": "http://www.stagnationmeansdecline.com/",
      "name": "stagnation means decline .com",
      "mobile": true,
      "year": 2002,
      "id": 2
    },
    {
      "url": "http://www.misternicehands.com/",
      "name": "mister nice hands .com",
      "flash": true,
      "year": 2001,
      "id": 1
    },
    {
      "url": "http://www.whitetrash.nl/",
      "name": "whitetrash .nl",
      "clickable": false,
      "flash": true,
      "year": 2001,
      "id": 0
    }
  ]
}
