
#include "main.h"

// Listing: Main.cpp
#include <iostream>
using namespace std;

// External procedure defined in asmfunctions.asm
extern "C" int FindSmallest(int* i, int count);
int main() {
	int arr[] = { 4, 2, 6, 4, 5, 1, 8, 9, 5, -5 };
	cout << "Smallest is " << FindSmallest(arr, 10) << endl; cin.get();
	return 0;
}