$root = 'C:\Users\user\Desktop\The Flyover Bridge Africa'
$htmlFiles = Get-ChildItem -Path $root -Filter *.html -File
$patterns = @('hamburger-icon', 'close-icon')

foreach ($f in $htmlFiles) {
    $content = Get-Content -Path $f.FullName -Raw
    foreach ($p in $patterns) {
        if ($content.Contains($p)) {
            Write-Output ($f.Name + " -> contains '" + $p + "'")
        }
    }
}
Write-Output "SCAN DONE"
