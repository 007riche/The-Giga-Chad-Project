; asmfunctions.asm
.xmm
.model flat, c
.data
.code
	FindSmallest proc export
		mov edx, dword ptr[esp+4] ; edx=*int
		mov ecx, dword ptr[esp+8] ; ecx = Count
		mov eax, 7fffffffh; eax will be our answer
		cmp ecx, 0 ; Are there 0 items?
		jle Finished ; If so we're done

	MainLoop:
		cmp dword ptr[edx], eax; Is * edx < eax?
		cmovl eax, dword ptr[edx] ; If so, eax = edx
		add edx, 4 ; Move *edx to next int
		dec ecx ; decrement counter
		jnz Mainloop ; Loo if there's more
		Finished:
		ret ; Return with lowest in eax
		FindSmallest endp
	end