"use client";
import type { ProfileContact } from "@/utils/types";
import Image from "next/image";

interface ProfileCardProps {
  name: string;
  role?: string;
  company?: string;
  bio?: string;
  avatar?: string;
  initials?: string;
  avatarBg?: string;
  skills?: string[];
  rating?: number;
  contact?: ProfileContact;
  ctaLabel?: string;
  onClick?: () => void;
  featured?: boolean;
}

export default function ProfileCard({
  name = "Nome Cognome",
  role = "",
  company = "",
  bio = "",
  avatar = "",
  initials = "",
  avatarBg = "bg-blue-700",
  skills = [],
  rating = 0,
  contact,
  ctaLabel = "",
  onClick,
  featured = false,
}: ProfileCardProps) {
  const autoInitials =
    initials ||
    name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("");

  return (
    <div
      className={`bg-white rounded-2xl border overflow-hidden flex flex-col transition-shadow duration-200 shadow-sm hover:shadow-md ${
        featured ? "border-blue-400 ring-2 ring-blue-200" : "border-gray-100"
      }`}
    >
      {/* ── Avatar + Info ── */}
      <div className="p-6 flex items-start gap-4">
        {/* Avatar */}
        <div className="shrink-0">
          {avatar ? (
            <Image
              src={avatar}
              alt={name}
              className="w-16 h-16 rounded-2xl object-cover"
            />
          ) : (
            <div className={`w-16 h-16 rounded-2xl ${avatarBg} flex items-center justify-center`}>
              <span className="text-white text-xl font-black">{autoInitials}</span>
            </div>
          )}
        </div>

        {/* Nome + ruolo */}
        <div className="min-w-0">
          <h3 className="text-base font-bold text-gray-900 leading-tight">{name}</h3>
          {role && <p className="text-sm text-blue-700 font-semibold mt-0.5">{role}</p>}
          {company && <p className="text-xs text-gray-500 mt-0.5">{company}</p>}

          {/* Stelle rating */}
          {rating > 0 && (
            <div className="flex items-center gap-0.5 mt-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg
                  key={s}
                  className={`w-3.5 h-3.5 ${s <= rating ? "text-amber-400" : "text-gray-200"}`}
                  fill="currentColor" viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Bio ── */}
      {bio && (
        <p className="px-6 pb-4 text-sm text-gray-500 leading-relaxed line-clamp-3">{bio}</p>
      )}

      {/* ── Skills ── */}
      {skills.length > 0 && (
        <div className="px-6 pb-4 flex flex-wrap gap-1.5">
          {skills.map((s) => (
            <span
              key={s}
              className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {/* ── Contatti ── */}
      {contact && (
        <div className="px-6 pb-4 flex flex-col gap-1">
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="text-xs text-gray-500 hover:text-blue-700 transition-colors flex items-center gap-1.5">
              <span>✉️</span> {contact.email}
            </a>
          )}
          {contact.linkedin && (
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="text-xs text-gray-500 hover:text-blue-700 transition-colors flex items-center gap-1.5">
              <span>🔗</span> LinkedIn
            </a>
          )}
          {contact.phone && (
            <span className="text-xs text-gray-500 flex items-center gap-1.5">
              <span>📞</span> {contact.phone}
            </span>
          )}
        </div>
      )}

      {/* ── CTA ── */}
      {ctaLabel && (
        <div className="px-6 pb-6 mt-auto">
          <button
            onClick={onClick}
            className="w-full py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
          >
            {ctaLabel}
          </button>
        </div>
      )}
    </div>
  );
}