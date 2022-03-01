dim shell
set shell = WScript.CreateObject("Shell.Application")

dim path
path = WScript.Arguments.Item(0)

' 4th argument can be used to specify the window mode, but the app crashes when "minimized" as in the case of the command line argument
shell.ShellExecute(path, "", "", "open", 1)


''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''


dim shell
set shell = WScript.CreateObject("WScript.Shell")

dim path
path = WScript.Arguments.Item(0)

dim p
dim pid

Set p = shell.Exec(path)

pid = p.ProcessID
WScript.Echo pid
