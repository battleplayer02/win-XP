$('main').on('focus', 'li', function () {
    $this = $(this);
    $this.addClass('active').siblings().removeClass();
    $this.closest('main').scrollTop($this.index() * $this.outerHeight());
}).on('keydown', 'li', function (e) {
    $this = $(this);
    if (e.keyCode == 40) { $this.next().focus(); return false; }
    else if (e.keyCode == 38) {
        $this.prev().focus(); return false;
    }
}).find('li').first().focus();

$("*").on("keydown", (e) => {
    e.keyCode == 13 ? window.location.replace("http://127.0.0.1:5500/WinXP/") : null
})