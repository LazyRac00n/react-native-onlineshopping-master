
/* Add in so we have Apple Target Conditionals */
#ifdef APPLE
#include <TargetConditionals.h>
#include <Availability.h>
#endif

/* Special configuration for AppleTVOS */
#if TARGET_OS_TV
#undef HAVE_SYSCALL_H
#undef HAVE_SYS_SYSCALL_H
#undef OS_MACOSX
#endif

/* Special configuration for ucontext */
#undef HAVE_UCONTEXT_H
#undef PC_FROM_UCONTEXT
#if defined(x86_64)
#define PC_FROM_UCONTEXT uc_mcontext->__ss.__rip
#elif defined(i386)
#define PC_FROM_UCONTEXT uc_mcontext->__ss.__eip
#endif
