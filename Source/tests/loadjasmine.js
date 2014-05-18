document.addEventListener('DOMContentLoaded', function () {
    // document.getElementById("loadjasmine").addEventListener('click', loadJasmine);
    loadJasmine();
});

function loadJasmine() {
  console.log("Loading Jasmine...");
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  function execJasmine() {
    jasmineEnv.execute();
  }
  function runTests() {
    execJasmine();
  }
  // document.getElementById("runtests").addEventListener('click', runTests);
  // runTests();
  setTimeout(function(){runTests();},1000);
  // setTimeout(function(){location.reload();},5000); //refresh every 5 seconds
}