$root = 'C:\Users\user\Desktop\The Flyover Bridge Africa'
$htmlFiles = Get-ChildItem -Path $root -Filter *.html -File
$needle = 'href="#"'

foreach ($f in $htmlFiles) {
    $lines = Get-Content -Path $f.FullName
    $lineNum = 0
    foreach ($line in $lines) {
        $lineNum++
        if ($line.Contains($needle)) {
            Write-Output ($f.Name + " | Line " + $lineNum + ": " + $line.Trim())
        }
    }
}
Write-Output "DONE"
