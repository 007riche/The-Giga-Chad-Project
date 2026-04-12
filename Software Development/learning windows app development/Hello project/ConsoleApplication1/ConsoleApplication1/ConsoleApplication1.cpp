// ConsoleApplication1.cpp : This file contains the 'main' function. Program execution begins and ends there.
//
#include <Windows.h>
#include <iostream>
#include <stdio.h>

int main(int argc, const char * argv[])
{
   /* SYSTEM_INFO si;
    ::GetNativeSystemInfo(&si);

    std::cout << "Hello World!\n";
    printf("Number of logical Processor: %d\n", si.dwNumberOfProcessors);
    printf("Page size: %d Bytes\n",  si.dwPageSize);
    printf("Processor Mask: 0x%p\n", (PVOID)si.dwActiveProcessorMask);
    printf("Minimum process address: 0x%p\n", si.lpMinimumApplicationAddress);
    printf("Maximum process address: 0x%p\n", si.lpMaximumApplicationAddress);
    */

    if (argc < 2) {
        printf("Usage: ShowError <error number>\n");
        return 0;
    }
    int message = atoi(argv[1]);

    LPWSTR text;

    DWORD chars = ::FormatMessage(
        FORMAT_MESSAGE_ALLOCATE_BUFFER |
        FORMAT_MESSAGE_FROM_SYSTEM |
        FORMAT_MESSAGE_IGNORE_INSERTS,
        nullptr, message, 0,
        (LPWSTR)&text,
        // ugly cast
        0, nullptr
    );

    if (chars > 0) {
        printf("Message %d: %ws\n", message, text);
        ::LocalFree(text);
    }
    else {
        printf("No such error exists\n");
    }

    return 0;
}

// Run program: Ctrl + F5 or Debug > Start Without Debugging menu
// Debug program: F5 or Debug > Start Debugging menu

// Tips for Getting Started: 
//   1. Use the Solution Explorer window to add/manage files
//   2. Use the Team Explorer window to connect to source control
//   3. Use the Output window to see build output and other messages
//   4. Use the Error List window to view errors
//   5. Go to Project > Add New Item to create new code files, or Project > Add Existing Item to add existing code files to the project
//   6. In the future, to open this project again, go to File > Open > Project and select the .sln file
