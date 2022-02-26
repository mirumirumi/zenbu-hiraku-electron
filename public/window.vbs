Dim shell
Set shell = WScript.CreateObject("WScript.Shell")

Dim pid
pid = WScript.Arguments.Item(0)
Dim window
window = WScript.Arguments.Item(1)

shell.AppActivate CStr(pid)

if window = "min" then
    shell.SendKeys "% n"
elseif window = "max" then
    shell.SendKeys "% x"
end if

Set shell = Nothing
