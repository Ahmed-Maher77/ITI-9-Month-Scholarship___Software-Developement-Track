import nodemailer from "nodemailer";

// Initialize transporter lazily so it doesn't fail at startup if env variables are missing.
let transporterInstance = null;

const getTransporter = () => {
    if (transporterInstance) {
        return transporterInstance;
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_PASS;

    if (!user || !pass) {
        console.warn("Gmail SMTP credentials (GMAIL_USER, GMAIL_PASS) are missing in environment variables. Emails will not be sent.");
        return null;
    }

    transporterInstance = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user,
            pass,
        },
    });

    return transporterInstance;
};

/**
 * Sends a subscription payment success email.
 */
export const sendPaymentSuccessEmail = async (user, plan, amount, renewalDate) => {
    const transporter = getTransporter();
    if (!transporter) return;

    const formattedDate = new Date(renewalDate).toLocaleDateString(user.preferredLanguage === "ar" ? "ar-EG" : "en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const isAr = user.preferredLanguage === "ar";
    const subject = isAr 
        ? "تم تفعيل اشتراك كشف بنجاح! 🎉" 
        : "Your Kashf Subscription is Active! 🎉";

    const planLabel = plan.toUpperCase();

    const htmlContent = isAr ? `
        <div style="background-color: #f8fafc; padding: 40px 20px; font-family: system-ui, -apple-system, sans-serif; direction: rtl; text-align: right;">
            <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                <!-- Logo Header -->
                <div style="text-align: center; margin-bottom: 24px;">
                    <h1 style="color: #2563eb; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">كشف Kashf</h1>
                    <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">مساعد استهلاك الكهرباء الذكي</p>
                </div>
                <div style="border-top: 1px solid #e2e8f0; margin-bottom: 24px;"></div>
                
                <!-- Main Message -->
                <h2 style="color: #059669; font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 12px;">تم تأكيد الدفع بنجاح!</h2>
                <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 8px;">مرحباً <strong>${user.username}</strong>،</p>
                <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 24px;">شكراً لك على ترقية حسابك. تم تفعيل باقة <strong>${planLabel}</strong> بنجاح وحسابك جاهز الآن للاستخدام بكامل المزايا والخصائص المتميزة.</p>
                
                <!-- Details Box -->
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
                    <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 16px; color: #0f172a; font-weight: 700;">تفاصيل الاشتراك:</h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">الباقة:</td>
                            <td style="padding: 10px 0; text-align: left; font-weight: 700; color: #0f172a;">Kashf ${planLabel}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">المبلغ المدفوع:</td>
                            <td style="padding: 10px 0; text-align: left; font-weight: 700; color: #0f172a;">${amount} جنيه مصري</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">تاريخ التجديد القادم:</td>
                            <td style="padding: 10px 0; text-align: left; font-weight: 700; color: #0f172a;">${formattedDate}</td>
                        </tr>
                    </table>
                </div>
                
                <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 24px;">لقد تم إضافة الكوينز الخاصة بالباقة الجديدة لحسابك. يمكنك الآن الاستفادة من التوصيات بالذكاء الاصطناعي وتوقعات الفواتير الكاملة.</p>
                
                <!-- CTA -->
                <div style="text-align: center; margin-bottom: 24px;">
                    <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard" style="background-color: #2563eb; color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 15px; box-shadow: 0 2px 4px rgba(37,99,235,0.2);">الانتقال إلى لوحة التحكم</a>
                </div>
                
                <div style="border-top: 1px solid #e2e8f0; margin-top: 24px; padding-top: 16px; text-align: center;">
                    <p style="font-size: 12px; color: #94a3b8; margin: 0;">إذا كان لديك أي استفسار، يرجى الرد على هذا الإيميل مباشرةً.</p>
                </div>
            </div>
        </div>
    ` : `
        <div style="background-color: #f8fafc; padding: 40px 20px; font-family: system-ui, -apple-system, sans-serif; direction: ltr; text-align: left;">
            <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                <!-- Logo Header -->
                <div style="text-align: center; margin-bottom: 24px;">
                    <h1 style="color: #2563eb; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">Kashf</h1>
                    <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">AI-powered Electricity Assistant</p>
                </div>
                <div style="border-top: 1px solid #e2e8f0; margin-bottom: 24px;"></div>
                
                <!-- Main Message -->
                <h2 style="color: #059669; font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 12px;">Payment Confirmed!</h2>
                <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 8px;">Hello <strong>${user.username}</strong>,</p>
                <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 24px;">Thank you for upgrading your account. Your <strong>Kashf ${planLabel}</strong> plan is now active, and your account has been updated with premium access.</p>
                
                <!-- Details Box -->
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
                    <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 16px; color: #0f172a; font-weight: 700;">Subscription Details:</h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Plan:</td>
                            <td style="padding: 10px 0; text-align: right; font-weight: 700; color: #0f172a;">Kashf ${planLabel}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Amount Paid:</td>
                            <td style="padding: 10px 0; text-align: right; font-weight: 700; color: #0f172a;">EGP ${amount}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Next Renewal Date:</td>
                            <td style="padding: 10px 0; text-align: right; font-weight: 700; color: #0f172a;">${formattedDate}</td>
                        </tr>
                    </table>
                </div>
                
                <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 24px;">Your premium coins have been credited to your balance. You can now use detailed AI advisor questions and forecast models.</p>
                
                <!-- CTA -->
                <div style="text-align: center; margin-bottom: 24px;">
                    <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard" style="background-color: #2563eb; color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 15px; box-shadow: 0 2px 4px rgba(37,99,235,0.2);">Go to Dashboard</a>
                </div>
                
                <div style="border-top: 1px solid #e2e8f0; margin-top: 24px; padding-top: 16px; text-align: center;">
                    <p style="font-size: 12px; color: #94a3b8; margin: 0;">If you have any questions, feel free to reply directly to this email.</p>
                </div>
            </div>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: `"Kashf Support" <${process.env.GMAIL_USER}>`,
            to: user.email,
            subject,
            html: htmlContent,
        });
        console.log(`Payment success email sent to ${user.email} for plan ${plan}`);
    } catch (err) {
        console.error("Failed to send payment success email:", err.message);
    }
};

/**
 * Sends a subscription expiration notification email.
 */
export const sendSubscriptionExpiredEmail = async (user, previousPlan) => {
    const transporter = getTransporter();
    if (!transporter) return;

    const isAr = user.preferredLanguage === "ar";
    const subject = isAr 
        ? "انتهى اشتراك كشف الخاص بك ⚠️" 
        : "Your Kashf Subscription has Expired ⚠️";

    const planLabel = previousPlan.toUpperCase();

    const htmlContent = isAr ? `
        <div style="background-color: #f8fafc; padding: 40px 20px; font-family: system-ui, -apple-system, sans-serif; direction: rtl; text-align: right;">
            <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                <!-- Logo Header -->
                <div style="text-align: center; margin-bottom: 24px;">
                    <h1 style="color: #2563eb; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">كشف Kashf</h1>
                    <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">مساعد استهلاك الكهرباء الذكي</p>
                </div>
                <div style="border-top: 1px solid #e2e8f0; margin-bottom: 24px;"></div>
                
                <!-- Main Message -->
                <h2 style="color: #dc2626; font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 12px;">انتهت صلاحية اشتراكك</h2>
                <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 8px;">مرحباً <strong>${user.username}</strong>،</p>
                <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 16px;">نود إعلامك بأن اشتراكك في باقة <strong>${planLabel}</strong> قد انتهى ولم نتمكن من تفعيله لعدم إتمام التجديد.</p>
                
                <p style="font-size: 15px; color: #475569; line-height: 1.6; margin-bottom: 16px; background-color: #fef2f2; border: 1px solid #fee2e2; border-radius: 8px; padding: 12px;">لقد تم خفض مستوى حسابك تلقائياً إلى الباقة <strong>المجانية (Free)</strong>. ونتيجة لذلك، تم تعطيل المزايا المتقدمة للباقة السابقة (مثل تحليلات الذكاء الاصطناعي وتوقعات الفواتير وإدارة الأجهزة الإضافية).</p>
                
                <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 24px;">يمكنك تجديد اشتراكك واستعادة كل المزايا في أي وقت عبر لوحة التحكم.</p>

                <!-- CTA -->
                <div style="text-align: center; margin-bottom: 24px;">
                    <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/billing" style="background-color: #2563eb; color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 15px; box-shadow: 0 2px 4px rgba(37,99,235,0.2);">تجديد الاشتراك الآن</a>
                </div>
                
                <div style="border-top: 1px solid #e2e8f0; margin-top: 24px; padding-top: 16px; text-align: center;">
                    <p style="font-size: 12px; color: #94a3b8; margin: 0;">إذا كان لديك أي استفسار، يرجى الرد على هذا الإيميل مباشرةً.</p>
                </div>
            </div>
        </div>
    ` : `
        <div style="background-color: #f8fafc; padding: 40px 20px; font-family: system-ui, -apple-system, sans-serif; direction: ltr; text-align: left;">
            <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                <!-- Logo Header -->
                <div style="text-align: center; margin-bottom: 24px;">
                    <h1 style="color: #2563eb; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">Kashf</h1>
                    <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">AI-powered Electricity Assistant</p>
                </div>
                <div style="border-top: 1px solid #e2e8f0; margin-bottom: 24px;"></div>
                
                <!-- Main Message -->
                <h2 style="color: #dc2626; font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 12px;">Subscription Expired</h2>
                <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 8px;">Hello <strong>${user.username}</strong>,</p>
                <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 16px;">This is a notification that your <strong>Kashf ${planLabel}</strong> subscription has expired because the renewal date has passed and payment was not completed.</p>
                
                <p style="font-size: 15px; color: #475569; line-height: 1.6; margin-bottom: 16px; background-color: #fef2f2; border: 1px solid #fee2e2; border-radius: 8px; padding: 12px;">Your account has been automatically downgraded to the <strong>Free Plan</strong>. Premium features like advanced AI advisor advice, cost forecasting, and multi-meter management are now restricted.</p>
                
                <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 24px;">You can upgrade or renew your plan at any time through the Billing settings page to regain access to all features.</p>

                <!-- CTA -->
                <div style="text-align: center; margin-bottom: 24px;">
                    <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/billing" style="background-color: #2563eb; color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 15px; box-shadow: 0 2px 4px rgba(37,99,235,0.2);">Renew Subscription Now</a>
                </div>
                
                <div style="border-top: 1px solid #e2e8f0; margin-top: 24px; padding-top: 16px; text-align: center;">
                    <p style="font-size: 12px; color: #94a3b8; margin: 0;">If you have any questions, feel free to reply directly to this email.</p>
                </div>
            </div>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: `"Kashf Support" <${process.env.GMAIL_USER}>`,
            to: user.email,
            subject,
            html: htmlContent,
        });
        console.log(`Subscription expiration email sent to ${user.email} for previous plan ${previousPlan}`);
    } catch (err) {
        console.error("Failed to send subscription expiration email:", err.message);
    }
};
