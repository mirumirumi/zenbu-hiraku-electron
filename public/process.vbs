set wmi = GetObject("winmgmts:\\.\root\cimv2")
set processes = wmi.ExecQuery("Select * From Win32_Process")

dim result
result = ""

' dim temp
' temp = ""

for each p in processes
    ' temp = temp & p.name & "     "
    if ((p.name <> "wscript.exe") and (p.name <> "WmiPrvSE.exe") and (p.name <> "audiodg.exe") and (p.name <> "cscript.exe") and (p.name <> "svchost.exe") and (p.name <> "SearchProtocolHost.exe") and (p.name <> "SearchFilterHost.exe")) then
        result = p.ProcessID
    end if
next

' WScript.Echo result
' WScript.Echo temp

dim fso
dim f
dim scriptdir

scriptdir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)

set fso = CreateObject("Scripting.FileSystemObject")
set f = fso.OpenTextFile(scriptdir & "/process_id.txt", 2, True)
f.WriteLine(result)
f.Close
