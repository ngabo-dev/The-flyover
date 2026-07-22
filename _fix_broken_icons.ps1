$root = 'C:\Users\user\Desktop\The Flyover Bridge Africa'
$htmlFiles = Get-ChildItem -Path $root -Filter *.html -File

$hamburgerOld = '<span class="hamburger-icon"></span>'
$hamburgerNew = '<ion-icon name="menu-outline"></ion-icon>'
$closeOld = '<span class="close-icon"></span>'
$closeNew = '<ion-icon name="close-outline"></ion-icon>'

foreach ($f in $htmlFiles) {
    $content = Get-Content -Path $f.FullName -Raw
    $original = $content
    $changed = $false

    if ($content.Contains($hamburgerOld)) {
        $content = $content.Replace($hamburgerOld, $hamburgerNew)
        $changed = $true
    }
    if ($content.Contains($closeOld)) {
        $content = $content.Replace($closeOld, $closeNew)
        $changed = $true
    }

    if ($changed) {
        Set-Content -Path $f.FullName -Value $content -NoNewline
        Write-Output ($f.Name + " -> FIXED")
    } else {
        Write-Output ($f.Name + " -> no change needed")
    }
}
Write-Output "FIX DONE"
