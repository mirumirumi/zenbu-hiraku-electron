dim shell
set shell = WScript.CreateObject("WScript.Shell")

dim pid
pid = WScript.Arguments.Item(0)
dim window
window = WScript.Arguments.Item(1)

dim counter

for counter = 1 to 5
    if shell.AppActivate(CStr(pid)) then
        WScript.Sleep 333

        if window = "min" then
            shell.SendKeys "% n"
        elseif window = "max" then
            shell.SendKeys "% x"
        end if
        
        Set shell = Nothing
        exit For
    else
        WScript.Sleep 500
    end if
next
