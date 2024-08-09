"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[346],{3346:(k,f,s)=>{s.r(f),s.d(f,{RegisterComponent:()=>M});var r=s(7788),p=s(6610),e=s(7222),h=s(7533),c=s(643),d=s(2221),m=s(6375),u=s(4587),g=s(6182),F=s(5981),v=s(4526),R=s(6347),w=s(7212),E=s(5860);class C extends E.b{constructor(i){super(),this.email=i.email,this.password=i.password,this.firstName=i.firstName,this.lastName=i.lastName}}var P=s(4509),y=s(922),S=s(2224),j=s(2118),G=s(2019);class ${static passwordMatcher(i){const o=i.get("password"),a=i.get("confirmPassword");return o.pristine||a.pristine||o.value===a.value?null:{passwordMatch:!0}}}class b{isErrorState(i){return(i?.parent?.invalid&&i.touched)??!1}}let M=(()=>{class n{constructor(){this.destroyRef=(0,r.WQX)(r.abz),this.changeDetector=(0,r.WQX)(r.gRc),this.fb=(0,r.WQX)(e.Qk),this.authService=(0,r.WQX)(h.u),this.router=(0,r.WQX)(y.Ix),this.formErrorService=(0,r.WQX)(P._),this.confirmValidParentMatcher=new b,this.registerForm=this.fb.group({email:["",[e.k0.required,e.k0.email]],passwordGroup:this.fb.group({password:["",[e.k0.required,e.k0.minLength(8)]],confirmPassword:["",e.k0.required]},{validators:$.passwordMatcher}),firstName:["",[e.k0.required,e.k0.maxLength(30)]],lastName:["",[e.k0.required,e.k0.maxLength(30)]]}),this.hidePassword=(0,r.vPA)(!0),this.isLoading$=new F.t(!1)}onSubmit(){if(this.registerForm.invalid)return;this.isLoading$.next(!0);const o=this.registerForm.getRawValue(),t=new C({email:o.email,password:o.passwordGroup.password,firstName:o.firstName,lastName:o.lastName});this.authService.register(t).pipe((0,v.W)(l=>{throw l instanceof j.c&&(this.formErrorService.showFormValidationErrors(this.registerForm,l),this.changeDetector.markForCheck()),Error}),(0,R.j)(()=>{this.isLoading$.next(!1)}),(0,w.pQ)(this.destroyRef)).subscribe(l=>this.router.navigate([S.n.home]))}clickHidePassword(o){this.hidePassword.set(!this.hidePassword()),o.stopPropagation()}static#r=this.\u0275fac=function(a){return new(a||n)};static#t=this.\u0275cmp=r.VBU({type:n,selectors:[["camp-register"]],standalone:!0,features:[r.aNF],decls:45,vars:21,consts:[[1,"register__form",3,"ngSubmit","formGroup"],["subscriptSizing","dynamic","appearance","outline",1,"register__input-field"],["matInput","","type","email",3,"formControl"],["matInput","","type","text",3,"formControl"],[1,"password-group",3,"formGroup"],["matInput","",3,"formControl","type"],["mat-icon-button","","matSuffix","","type","button",3,"click"],["matInput","",3,"formControl","type","errorStateMatcher"],[1,"register__actions"],["mat-stroked-button","","type","submit",3,"disabled"]],template:function(a,t){1&a&&(r.j41(0,"camp-auth")(1,"form",0),r.bIt("ngSubmit",function(){return t.onSubmit()}),r.j41(2,"mat-form-field",1)(3,"mat-label"),r.EFF(4,"Email"),r.k0s(),r.nrm(5,"input",2),r.j41(6,"mat-error")(7,"span"),r.EFF(8),r.k0s()()(),r.j41(9,"mat-form-field",1)(10,"mat-label"),r.EFF(11,"First name"),r.k0s(),r.nrm(12,"input",3),r.j41(13,"mat-error")(14,"span"),r.EFF(15),r.k0s()()(),r.j41(16,"mat-form-field",1)(17,"mat-label"),r.EFF(18,"Last name"),r.k0s(),r.nrm(19,"input",3),r.j41(20,"mat-error")(21,"span"),r.EFF(22),r.k0s()()(),r.j41(23,"div",4)(24,"mat-form-field",1)(25,"mat-label"),r.EFF(26,"Password"),r.k0s(),r.nrm(27,"input",5),r.j41(28,"button",6),r.bIt("click",function(N){return t.clickHidePassword(N)}),r.j41(29,"mat-icon"),r.EFF(30),r.k0s()(),r.j41(31,"mat-error")(32,"span"),r.EFF(33),r.k0s()()(),r.j41(34,"mat-form-field",1)(35,"mat-label"),r.EFF(36,"Confirm password"),r.k0s(),r.nrm(37,"input",7),r.j41(38,"mat-error")(39,"span"),r.EFF(40),r.k0s()()()(),r.j41(41,"div",8)(42,"button",9),r.nI1(43,"async"),r.EFF(44,"Register"),r.k0s()()()()),2&a&&(r.R7$(),r.Y8G("formGroup",t.registerForm),r.R7$(4),r.Y8G("formControl",t.registerForm.controls.email),r.R7$(3),r.JRh(t.formErrorService.getFieldError(t.registerForm,"email")),r.R7$(4),r.Y8G("formControl",t.registerForm.controls.firstName),r.R7$(3),r.JRh(t.formErrorService.getFieldError(t.registerForm,"firstName")),r.R7$(4),r.Y8G("formControl",t.registerForm.controls.lastName),r.R7$(3),r.JRh(t.formErrorService.getFieldError(t.registerForm,"lastName")),r.R7$(),r.Y8G("formGroup",t.registerForm.controls.passwordGroup),r.R7$(4),r.Y8G("formControl",t.registerForm.controls.passwordGroup.controls.password)("type",t.hidePassword()?"password":"text"),r.R7$(),r.BMQ("aria-label","Hide password")("aria-pressed",t.hidePassword()),r.R7$(2),r.JRh(t.hidePassword()?"visibility_off":"visibility"),r.R7$(3),r.JRh(t.formErrorService.getFieldError(t.registerForm,"passwordGroup.password")),r.R7$(4),r.Y8G("formControl",t.registerForm.controls.passwordGroup.controls.confirmPassword)("type",t.hidePassword()?"password":"text")("errorStateMatcher",t.confirmValidParentMatcher),r.R7$(3),r.JRh(t.formErrorService.getFieldError(t.registerForm,"passwordGroup")),r.R7$(2),r.Y8G("disabled",t.registerForm.invalid||r.bMT(43,19,t.isLoading$)))},dependencies:[p.MD,p.Jj,e.X1,e.qT,e.me,e.BC,e.cb,e.l_,e.j4,c.Hu,d.Hl,d.$z,d.iY,m.RG,m.rl,m.nJ,m.TL,m.yw,u.fS,u.fg,g.m_,g.An,G.i],styles:[".register__input-field[_ngcontent-%COMP%]{width:100%}.register__form[_ngcontent-%COMP%]{--input-gap: var(--space-3);display:flex;flex-direction:column;gap:var(--input-gap)}.password-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--input-gap)}.register__content[_ngcontent-%COMP%]:last-child{padding:0}.register__actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}"],changeDetection:0})}return n})()}}]);