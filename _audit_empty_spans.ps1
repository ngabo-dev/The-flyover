$root = 'C:\Users\user\Desktop\The Flyover Bridge Africa'
$htmlFiles = Get-ChildItem -Path $root -Filter *.html -File
$regex = [regex]'<span class="[a-zA-Z0-9_-]*-icon"></span>'

foreach ($f in $htmlFiles) {
    $content = Get-Content -Path $f.FullName -Raw
    $found = $regex.Matches($content)
    foreach ($m in $found) {
        Write-Output ($f.Name + " -> " + $m.Value)
    }
}
Write-Output "SCAN DONE"
