"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCurrentUser, getUserToken } from "@/utils/auth";

const UserAuthContext = createContext({
     user: null,
     isLoggedIn: false,
     loading: true,
     refreshUser: async () => {},
     isCourseUnlocked: () => false,
});

export function UserAuthProvider({ children }) {
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);

     const refreshUser = useCallback(async () => {
          setLoading(true);
          const token = getUserToken();
          if (!token) {
               setUser(null);
               setLoading(false);
               return null;
          }

          try {
               const userData = await getCurrentUser();
               setUser(userData || null);
               return userData || null;
          } catch (err) {
               console.error("Failed to refresh user data:", err);
               setUser(null);
               return null;
          } finally {
               setLoading(false);
          }
     }, []);

     useEffect(() => {
          refreshUser();
     }, [refreshUser]);

     const isCourseUnlocked = useCallback((course) => {
          if (!user || !user.enrolledCourses || !Array.isArray(user.enrolledCourses)) {
               return false;
          }

          if (!course) return false;

          const targetId = (course._id || course.id || "").toString().toLowerCase();
          const targetSlug = (course.slug || "").toString().toLowerCase();
          const targetTitle = (course.title || course.name || "").toString().toLowerCase();

          return user.enrolledCourses.some((item) => {
               if (!item) return false;

               const itemCourseId = item.courseId;
               const itemCourseSlug = (item.courseSlug || "").toString().toLowerCase();

               // Direct string comparison
               if (typeof itemCourseId === "string" || typeof itemCourseId === "number") {
                    const strId = itemCourseId.toString().toLowerCase();
                    if (targetId && strId === targetId) return true;
                    if (targetSlug && strId === targetSlug) return true;
                    if (targetTitle && targetTitle.includes(strId)) return true;
               }

               if (itemCourseSlug) {
                    if (targetSlug && itemCourseSlug === targetSlug) return true;
                    if (targetSlug && (itemCourseSlug.includes(targetSlug) || targetSlug.includes(itemCourseSlug))) return true;
                    if (targetTitle && targetTitle.includes(itemCourseSlug)) return true;
               }

               // Populated object comparison
               if (itemCourseId && typeof itemCourseId === "object") {
                    const cId = (itemCourseId._id || itemCourseId.id || "").toString().toLowerCase();
                    const cSlug = (itemCourseId.slug || "").toString().toLowerCase();
                    const cTitle = (itemCourseId.title || itemCourseId.name || "").toString().toLowerCase();

                    if (targetId && cId && cId === targetId) return true;
                    if (targetSlug && cSlug && cSlug === targetSlug) return true;
                    if (targetSlug && cSlug && (cSlug.includes(targetSlug) || targetSlug.includes(cSlug))) return true;
                    if (targetTitle && cTitle && (cTitle.includes(targetTitle) || targetTitle.includes(cTitle))) return true;
               }

               return false;
          });
     }, [user]);

     return (
          <UserAuthContext.Provider
               value={{
                    user,
                    isLoggedIn: !!user,
                    loading,
                    refreshUser,
                    isCourseUnlocked,
               }}
          >
               {children}
          </UserAuthContext.Provider>
     );
}

export function useUserAuth() {
     return useContext(UserAuthContext);
}
