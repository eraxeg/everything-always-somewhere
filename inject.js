var countdown, extension_status;

function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    countdown: 6
  }, function(items) {
    countdown = items.countdown;
  });
}

restore_options();
var timerFunction;

if( extension_status == 'on' ) {
  var i = 0;
  timerFunction = setInterval(countdownFunction, 1000);
} else {
  clearInterval(timerFunction);
}

var countdownFunction = function () {
  console.log(i++);
  chrome.runtime.sendMessage(countdown-i, function(response) {
    console.log("from extension: " + response.success);
  });
  if (i - countdown === 0){
    chrome.runtime.sendMessage(countdown-i, function(response) {
      console.log("from extension: " + response.success);
    });
    i = 0;
    randomWebsite();
  }
  if( extension_status == 'off' ) {
    clearInterval(timerFunction);
  }
}

function changePage(page) {
  console.log("changing website to " + page.name)
  var script = 'window.location.replace("' + page.url + '");';
  chrome.runtime.sendMessage(page, function(response) {
    console.log("from extension: " + response.success);
  });
}

function randomWebsite(){
  console.log("random website");
  var randomIndex = Math.floor(Math.random() * m_websites.websites.length);
  console.log(randomIndex)
  changePage(m_websites.websites[randomIndex]);
  console.log(m_websites.websites[randomIndex].url);
}

//------------------------------------------------------------------------------

var m_websites = {
  "websites": [
    {
      "url": "http://www.manualsequence.com/",
      "name": "manual sequence .com",
      "mobile": true
    },
    {
      "url": "http://www.thisgrey.com/",
      "name": "this grey .com",
      "mobile": true
    },
    {
      "url": "http://www.nearnext.com/",
      "name": "near next .com",
      "mobile": true
    },
    {
      "url": "http://www.watchyourot.com/",
      "name": "watch you rot .com",
      "mobile": true
    },
    {
      "url": "http://www.doublenever.com/",
      "name": "double never .com",
      "mobile": true
    },
    {
      "url": "http://www.taskunrelated.com/",
      "name": "task unrelated .com",
      "mobile": true
    },
    {
      "url": "http://www.lotsofmany.com/",
      "name": "lots of many .com",
      "mobile": true
    },
    {
      "url": "http://www.eggalone.com/",
      "name": "egg alone .com",
      "mobile": true
    },
    {
      "url": "http://www.blankwindows.com/",
      "name": "blank windows .com",
      "mobile": true
    },
    {
      "url": "http://www.newoldhotcold.com/",
      "name": "new old hot cold .com",
      "mobile": true
    },
    {
      "url": "http://www.somethingopen.com/",
      "name": "something open .com",
      "mobile": true
    },
    {
      "url": "http://www.floatingthe.com/",
      "name": "floating the .com",
      "mobile": true
    },
    {
      "url": "http://www.terminalobject.com/",
      "name": "terminal object .com",
      "mobile": true
    },
    {
      "url": "http://www.crossdivisions.com/",
      "name": "cross divisions .com",
      "mobile": true
    },
    {
      "url": "http://www.herethat.com/",
      "name": "here that .com",
      "mobile": true
    },
    {
      "url": "http://www.unknownlandscape.com/",
      "name": "unknown landscape .com",
      "mobile": true
    },
    {
      "url": "http://www.thisemptyroom.com/",
      "name": "this empty room .com",
      "mobile": true
    },
    {
      "url": "http://www.floatbounce.com/",
      "name": "float bounce .com",
      "mobile": true
    },
    {
      "url": "http://www.infinitething.com/",
      "name": "infinite thing .com",
      "mobile": true
    },
    {
      "url": "http://www.trashloop.com/",
      "name": "trash loop .com",
      "mobile": true
    },
    {
      "url": "http://www.silentsilence.com/",
      "name": "silent silence .com",
      "mobile": true
    },
    {
      "url": "http://www.nevernowhere.com/",
      "name": "never nowhere .com",
      "mobile": true
    },
    {
      "url": "http://www.tryingtrying.com/",
      "name": "trying trying .com",
      "mobile": true
    },
    {
      "url": "http://www.yesnoif.com/",
      "name": "yes no if .com",
      "mobile": true
    },
    {
      "url": "http://www.softslow.com/",
      "name": "soft slow .com",
      "mobile": true
    },
    {
      "url": "http://www.neogeocity.com/",
      "name": "neo geo city .com",
      "mobile": true
    },
    {
      "url": "http://www.oozemove.com/",
      "name": "ooze move .com",
      "mobile": true
    },
    {
      "url": "http://www.remotelydistant.com/",
      "name": "remotely distant .com",
      "mobile": true
    },
    {
      "url": "http://www.sinkslow.com/",
      "name": "sink slow .com",
      "mobile": true
    },
    {
      "url": "http://www.homagetothe.com/",
      "name": "homage to the .com",
      "mobile": true
    },
    {
      "url": "http://www.innerinterior.com/",
      "name": "inner interior .com",
      "mobile": true
    },
    {
      "url": "http://www.thisthatnow.com/",
      "name": "this that now .com",
      "mobile": true
    },
    {
      "url": "http://www.noifyes.com/",
      "name": "no if yes .com",
      "mobile": true
    },
    {
      "url": "http://www.blackgreyblack.com/",
      "name": "black grey black .com",
      "mobile": true
    },
    {
      "url": "http://www.roomwarp.com/",
      "name": "room warp .com",
      "mobile": true
    },
    {
      "url": "http://www.slickquick.com/",
      "name": "slick quick .com",
      "mobile": true
    },
    {
      "url": "http://www.pinkyellowblue.com/",
      "name": "pink yellow blue .com",
      "mobile": true
    },
    {
      "url": "http://www.openthatwindow.com/",
      "name": "open that window .com",
      "mobile": true
    },
    {
      "url": "http://www.deepsadness.com/",
      "name": "deep sadness .com",
      "mobile": true
    },
    {
      "url": "http://www.flyingfrying.com/",
      "name": "flying frying .com",
      "mobile": true
    },
    {
      "url": "http://www.fillthisup.com/",
      "name": "fill this up .com",
      "mobile": true
    },
    {
      "url": "http://www.slowempty.com/",
      "name": "slow empty .com",
      "mobile": true
    },
    {
      "url": "http://www.ifeelstrange.com/",
      "name": "i feel strange .com",
      "mobile": true
    },
    {
      "url": "http://www.everythingalwayseverywhere.com/",
      "name": "everything always everywhere .com",
      "mobile": true
    },
    {
      "url": "http://www.maybewhat.com/",
      "name": "maybe what .com",
      "mobile": true
    },
    {
      "url": "http://www.nothingeverhappens.com/",
      "name": "nothing ever happens .com",
      "mobile": true
    },
    {
      "url": "http://www.futureisuncertain.com/",
      "name": "future is uncertain .com",
      "mobile": true
    },
    {
      "url": "http://www.ifnoyes.com/",
      "name": "if no yes.com",
      "mobile": true
    },
    {
      "url": "http://www.hexattack.com/",
      "name": "hex attack .com",
      "mobile": true
    },
    {
      "url": "http://www.ifyesno.com/",
      "name": "if yes no.com",
      "mobile": true
    },
    {
      "url": "http://www.randomfear.com/",
      "name": "random fear .com",
      "mobile": true
    },
    {
      "url": "http://www.lookingatsomething.com/",
      "name": "looking at something .com",
      "mobile": true
    },
    {
      "url": "http://www.openthiswindow.com/",
      "name": "open this window .com",
      "mobile": true
    },
    {
      "url": "http://www.innerdoubts.com/",
      "name": "inner doubts .com",
      "mobile": true,
      "clickable": true,
      "show": true
    },
    {
      "url": "http://www.violentpower.com/",
      "name": "violent power.com",
      "mobile": true
    },
    {
      "url": "http://www.movenowthinklater.com/",
      "name": "move now think later .com",
      "mobile": true
    },
    {
      "url": "http://www.intotime.us/",
      "name": "into time .us",
      "mobile": true
    },
    {
      "url": "http://www.almostcalm.com/",
      "name": "almost calm .com",
      "mobile": true
    },
    {
      "url": "http://www.intotime.org/",
      "name": "into time .org",
      "mobile": true
    },
    {
      "url": "http://www.fallingfalling.com/",
      "name": "falling falling .com",
      "mobile": true
    },
    {
      "url": "http://www.tothewater.com/",
      "name": "to the water .com",
      "mobile": true
    },
    {
      "url": "http://www.intotime.com/",
      "name": "into time .com",
      "mobile": true
    },
    {
      "url": "http://www.hotdoom.com/",
      "name": "hot doom .com",
      "mobile": true
    },
    {
      "url": "http://www.hybridmoment.com/",
      "name": "hybrid moment .com",
      "mobile": true
    },
    {
      "url": "http://www.electricboogiewoogie.com/",
      "name": "electric boogie woogie .com",
      "mobile": true
    },
    {
      "url": "http://www.beefchickenpork.com/",
      "name": "beef chicken pork .com",
      "mobile": true
    },
    {
      "url": "http://www.popcornpainting.com/",
      "name": "popcorn painting .com",
      "mobile": true
    },
    {
      "url": "http://www.papertoilet.com/",
      "name": "paper toilet .com",
      "mobile": true
    },
    {
      "url": "http://www.muchbetterthanthis.com/",
      "name": "much better than this .com",
      "mobile": true
    },
    {
      "url": "http://www.pleasetouchme.com/",
      "name": "please touch me .com",
      "mobile": true,
      "draggable": true,
      "show": false
    },
    {
      "url": "http://www.wewillattack.com/",
      "name": "we will attack .com",
      "mobile": true
    },
    {
      "url": "http://www.stagnationmeansdecline.com/",
      "name": "stagnation means decline .com",
      "mobile": true
    }
  ]
}
