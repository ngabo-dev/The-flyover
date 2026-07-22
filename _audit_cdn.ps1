$root = 'C:\Users\user\Desktop\The Flyover Bridge Africa'
$htmlFiles = Get-ChildItem -Path $root -Filter *.html -File
$needle = 'unpkg.com'

foreach ($f in $htmlFiles) {
    $content = Get-Content -Path $f.FullName -Raw
    if ($content.Contains($needle)) {
        Write-Output ($f.Name + " -> STILL USES CDN")
    } else {
        Write-Output ($f.Name + " -> self-hosted OK")
    }
}
